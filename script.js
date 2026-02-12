/**
 * NamOS - Main Initialization Script
 * Initializes the UI framework and sets up the home screen
 */

let systemReady = false;

async function initializeNamOS() {
    try {
        console.log('Initializing NamOS...');
        
        // Initialize UI Framework
        await window.UIFramework.init();
        
        // Register themes
        if (window.NamUI1Theme) {
            window.UIFramework.registerTheme('NamUI1', NamUI1Theme);
        }
        if (window.TwoUI1Theme) {
            window.UIFramework.registerTheme('TwoUI1', TwoUI1Theme);
        }
        
        // Load custom themes from storage
        window.UIFramework.loadCustomThemes();
        
        // Inject theme CSS
        const currentTheme = window.UIFramework.getTheme(window.UIFramework.currentTheme);
        if (currentTheme && currentTheme.style && currentTheme.style.customCSS) {
            window.UIFramework.injectCustomCSS(window.UIFramework.currentTheme, currentTheme.style.customCSS);
        }
        
        // Build the home screen
        buildHomeScreen();
        
        // Remove loading screen
        removeLoadingScreen();
        
        systemReady = true;
        console.log('NamOS initialization complete!');
        
    } catch (error) {
        console.error('Error initializing NamOS:', error);
        document.body.innerHTML = `<div style="color: red; padding: 20px;">Error initializing NamOS: ${error.message}</div>`;
    }
}

function buildHomeScreen() {
    const container = document.getElementById('home-screen') || createHomeScreenContainer();
    
    const theme = window.UIFramework.getTheme(window.UIFramework.currentTheme);
    if (!theme) {
        console.error('Theme not found');
        return;
    }
    
    // Clear previous content
    container.innerHTML = '';
    
    // Build status bar
    buildStatusBar(container, theme);
    
    // Build home screen with apps
    buildAppsGrid(container, theme);
    
    // Build dock
    buildDock(container, theme);
}

function createHomeScreenContainer() {
    const container = document.createElement('div');
    container.id = 'home-screen';
    container.style.cssText = `
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--background-dark);
        overflow: hidden;
    `;
    document.body.appendChild(container);
    return container;
}

function buildStatusBar(container, theme) {
    if (!theme.statusBar) return;
    
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    statusBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: ${theme.statusBar.height || 'var(--status-bar-height)'};
        background: var(--liquid-glass);
        backdrop-filter: blur(var(--glass-blur));
        border-bottom: 1px solid var(--glass-border-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        z-index: 1000;
        font-size: 14px;
        color: var(--text-primary);
    `;
    
    // Time
    if (theme.statusBar.showTime) {
        const timeEl = document.createElement('div');
        timeEl.className = 'status-time';
        const updateTime = () => {
            timeEl.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        };
        updateTime();
        setInterval(updateTime, 1000);
        statusBar.appendChild(timeEl);
    }
    
    // Center spacer
    const spacer = document.createElement('div');
    spacer.style.flex = '1';
    statusBar.appendChild(spacer);
    
    // Signal and battery info
    const rightInfo = document.createElement('div');
    rightInfo.style.cssText = 'display: flex; gap: 12px; align-items: center;';
    if (theme.statusBar.showSignal) {
        rightInfo.innerHTML += '<span>📶</span>';
    }
    if (theme.statusBar.showBattery) {
        rightInfo.innerHTML += '<span>🔋</span>';
    }
    statusBar.appendChild(rightInfo);
    
    container.appendChild(statusBar);
}

function buildAppsGrid(container, theme) {
    const mainContent = document.createElement('div');
    mainContent.className = 'apps-container';
    mainContent.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 60px 20px 100px 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: clamp(0.75rem, 3vw, 2rem);
        align-content: start;
    `;
    
    // Sample apps
    const apps = [
        { id: 'phone', label: 'Phone', icon: '📱' },
        { id: 'messages', label: 'Messages', icon: '💬' },
        { id: 'camera', label: 'Camera', icon: '📷' },
        { id: 'maps', label: 'Maps', icon: '🗺️' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'clock', label: 'Clock', icon: '⏰' },
        { id: 'calculator', label: 'Calculator', icon: '🧮' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    
    apps.forEach(app => {
        const appIcon = document.createElement('div');
        appIcon.className = `${theme.name}-app-icon app-icon`;
        appIcon.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 80px;
            height: 100px;
            background: var(--liquid-glass);
            backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--glass-border-color);
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            font-size: 32px;
            color: var(--text-primary);
        `;
        
        appIcon.innerHTML = `
            <div style="font-size: 32px;">${app.icon}</div>
            <div style="font-size: 11px; text-align: center; max-width: 70px; word-break: break-word;">${app.label}</div>
        `;
        
        appIcon.addEventListener('mouseenter', () => {
            appIcon.style.transform = 'scale(1.1) translateY(-4px)';
            appIcon.style.background = 'var(--liquid-glass-hover)';
            appIcon.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
        });
        
        appIcon.addEventListener('mouseleave', () => {
            appIcon.style.transform = 'none';
            appIcon.style.background = 'var(--liquid-glass)';
            appIcon.style.boxShadow = 'none';
        });
        
        appIcon.addEventListener('click', () => {
            console.log('Opened app:', app.label);
        });
        
        mainContent.appendChild(appIcon);
    });
    
    container.appendChild(mainContent);
}

function buildDock(container, theme) {
    if (!theme.dock) return;
    
    const dock = document.createElement('div');
    dock.className = `${theme.name}-dock dock`;
    dock.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${theme.dock.height || 'var(--dock-height)'};
        background: var(--liquid-glass);
        backdrop-filter: blur(var(--glass-blur));
        border-top: 1px solid var(--glass-border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 12px;
        z-index: 999;
    `;
    
    if (theme.dock.items && Array.isArray(theme.dock.items)) {
        theme.dock.items.forEach(item => {
            const dockItem = document.createElement('div');
            dockItem.className = 'dock-item';
            dockItem.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                background: var(--liquid-glass);
                border-radius: calc(var(--border-radius) / 2);
                cursor: pointer;
                transition: var(--transition);
                font-size: 24px;
                border: 1px solid var(--glass-border-color);
            `;
            
            dockItem.textContent = item.icon;
            dockItem.title = item.label;
            
            dockItem.addEventListener('mouseenter', () => {
                dockItem.style.transform = 'scale(1.15) translateY(-8px)';
                dockItem.style.background = 'var(--liquid-glass-hover)';
            });
            
            dockItem.addEventListener('mouseleave', () => {
                dockItem.style.transform = 'none';
                dockItem.style.background = 'var(--liquid-glass)';
            });
            
            dockItem.addEventListener('click', () => {
                console.log('Dock item clicked:', item.label);
            });
            
            dock.appendChild(dockItem);
        });
    }
    
    container.appendChild(dock);
}

function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

function createLoadingScreen() {
    const loading = document.createElement('div');
    loading.id = 'loading-screen';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--background-dark);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        gap: 20px;
    `;
    
    loading.innerHTML = `
        <div style="font-size: 48px; color: var(--primary-blue);">🎨</div>
        <div style="color: var(--text-primary); font-size: 18px; font-weight: 600;">NamOS Loading</div>
        <div style="
            width: 40px;
            height: 3px;
            background: var(--primary-blue);
            border-radius: 2px;
            animation: pulse 1.5s ease-in-out infinite;
        "></div>
        <style>
            @keyframes pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        </style>
    `;
    
    document.body.appendChild(loading);
}

// Show loading screen
createLoadingScreen();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNamOS);
} else {
    initializeNamOS();
}
