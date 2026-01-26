class IndexedDBStorage {
    constructor(dbName = 'NamOSStorage', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.storeName = 'keyvalue';
        this.db = null;
        this.ready = false;
        this.cacheReady = false;
        this.cache = new Map();
        this.initPromise = this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('IndexedDB failed to open:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.ready = true;
                resolve(this.db);
                this.loadCacheInternal().then(() => {
                    this.cacheReady = true;
                    console.log('IndexedDB initialized and cache loaded successfully');
                }).catch(err => {
                    console.error('Error loading cache:', err);
                    this.cacheReady = true;
                });
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
    }

    async loadCacheInternal() {
        try {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            return new Promise((resolve, reject) => {
                const request = store.openCursor();
                
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        this.cache.set(cursor.key, cursor.value);
                        cursor.continue();
                    } else {
                        resolve();
                    }
                };
                
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Error loading cache:', error);
            throw error;
        }
    }

    async getAllItems() {
        await this.initPromise;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAllKeys();
            
            request.onsuccess = () => {
                const keys = request.result;
                const promises = keys.map(key => {
                    return new Promise((res, rej) => {
                        const getRequest = store.get(key);
                        getRequest.onsuccess = () => res({ key, value: getRequest.result });
                        getRequest.onerror = () => rej(getRequest.error);
                    });
                });
                
                Promise.all(promises).then(results => {
                    const items = {};
                    for (const { key, value } of results) {
                        items[key] = value;
                    }
                    resolve(items);
                }).catch(reject);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    async setItem(key, value) {
        await this.initPromise;
        this.cache.set(key, value);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(value, key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getItem(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        await this.initPromise;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                const value = request.result !== undefined ? request.result : null;
                if (value !== null) {
                    this.cache.set(key, value);
                }
                resolve(value);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async removeItem(key) {
        await this.initPromise;
        this.cache.delete(key);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async clear() {
        await this.initPromise;
        this.cache.clear();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async key(index) {
        await this.initPromise;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAllKeys();

            request.onsuccess = () => {
                const keys = request.result;
                resolve(keys[index] !== undefined ? keys[index] : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    get length() {
        return this.cache.size;
    }

    setItemSync(key, value) {
        this.cache.set(key, value);
        this.setItem(key, value).catch(err => {
            console.error('Error saving to IndexedDB:', err);
        });
    }

    getItemSync(key) {
        const cachedValue = this.cache.get(key);
        return cachedValue !== undefined ? cachedValue : null;
    }

    removeItemSync(key) {
        this.cache.delete(key);
        this.removeItem(key).catch(err => {
            console.error('Error removing from IndexedDB:', err);
        });
    }

    clearSync() {
        this.cache.clear();
        this.clear().catch(err => {
            console.error('Error clearing IndexedDB:', err);
        });
    }

    waitForCache() {
        return new Promise((resolve) => {
            if (this.cacheReady) {
                resolve();
            } else {
                const checkReady = () => {
                    if (this.cacheReady) {
                        resolve();
                    } else {
                        setTimeout(checkReady, 10);
                    }
                };
                checkReady();
            }
        });
    }
}

const idbStorage = new IndexedDBStorage();

const tempStorage = new Map();
const queuedOperations = new Map();

function flushQueuedOperations() {
    for (const [key, op] of queuedOperations.entries()) {
        if (op.type === 'set') {
            idbStorage.setItemSync(key, op.value);
        } else if (op.type === 'remove') {
            idbStorage.removeItemSync(key);
        }
    }
    queuedOperations.clear();
}

const localStorageProxy = {
    setItem: (key, value) => {
        if (!idbStorage.cacheReady) {
            tempStorage.set(key, value);
            queuedOperations.set(key, { type: 'set', value });
        } else {
            idbStorage.setItemSync(key, value);
        }
    },
    getItem: (key) => {
        if (!idbStorage.cacheReady) {
            return tempStorage.has(key) ? tempStorage.get(key) : null;
        }
        return idbStorage.getItemSync(key);
    },
    removeItem: (key) => {
        if (!idbStorage.cacheReady) {
            tempStorage.delete(key);
            queuedOperations.set(key, { type: 'remove' });
        } else {
            idbStorage.removeItemSync(key);
        }
    },
    clear: () => {
        if (!idbStorage.cacheReady) {
            tempStorage.clear();
            queuedOperations.clear();
        } else {
            idbStorage.clearSync();
        }
    },
    key: (index) => {
        const keys = idbStorage.cacheReady 
            ? Array.from(idbStorage.cache.keys())
            : Array.from(tempStorage.keys());
        return keys[index] !== undefined ? keys[index] : null;
    },
    get length() {
        return idbStorage.cacheReady ? idbStorage.cache.size : tempStorage.size;
    }
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageProxy,
    writable: false,
    configurable: true
});

window.idbStorage = idbStorage;

window.waitForStorageReady = function() {
    return idbStorage.waitForCache().then(() => {
        for (const [key, value] of tempStorage.entries()) {
            if (!idbStorage.cache.has(key)) {
                idbStorage.cache.set(key, value);
            }
        }
        flushQueuedOperations();
        tempStorage.clear();
        console.log('Storage ready - cache loaded and temp data flushed');
    });
};

console.log('IndexedDB storage wrapper initialized');
