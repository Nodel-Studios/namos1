/**
 * NamOS UI Framework
 * A JSON-based UI system that renders themes dynamically
 */

class UIFramework {
    constructor() {
        this.currentTheme = 'NamUI1';
        this.themes = {};
        this.cssRules = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the UI Framework
     */
    async init() {
        if (this.initialized) return;
        
        // Load stored theme preference
        const savedTheme = localStorage.getItem('namos_ui_theme') || 'NamUI1';
        this.currentTheme = savedTheme;
        
        this.initialized = true;
        console.log('UIFramework initialized with theme:', this.currentTheme);
    }

    /**
     * Register a theme
     */
    registerTheme(themeName, themeDefinition) {
        this.themes[themeName] = themeDefinition;
        console.log('Theme registered:', themeName);
    }

    /**
     * Get a theme definition
     */
    getTheme(themeName) {
        return this.themes[themeName];
    }

    /**
     * Get all available themes
     */
    getAllThemes() {
        return Object.keys(this.themes);
    }

    /**
     * Switch to a different theme
     */
    async switchTheme(themeName) {
        if (!this.themes[themeName]) {
            console.error(`Theme '${themeName}' not found`);
            return false;
        }

        this.currentTheme = themeName;
        localStorage.setItem('namos_ui_theme', themeName);
        
        // Apply theme CSS
        this.applyThemeCSS(themeName);
        
        // Emit theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { themeName } 
        }));
        
        console.log('Switched to theme:', themeName);
        return true;
    }

    /**
     * Apply theme's CSS variables
     */
    applyThemeCSS(themeName) {
        const theme = this.themes[themeName];
        if (!theme || !theme.style) return;

        const root = document.documentElement;
        const colors = theme.style.colors || {};
        const sizing = theme.style.sizing || {};

        // Apply color variables
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Apply sizing variables
        Object.entries(sizing).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // Apply custom CSS if provided
        if (theme.style.customCSS) {
            this.injectCustomCSS(themeName, theme.style.customCSS);
        }
    }

    /**
     * Inject custom CSS for a theme
     */
    injectCustomCSS(themeName, customCSS) {
        // Remove old style if exists
        let styleEl = document.getElementById(`theme-${themeName}-style`);
        if (styleEl) {
            styleEl.remove();
        }

        // Create and inject new style
        styleEl = document.createElement('style');
        styleEl.id = `theme-${themeName}-style`;
        styleEl.innerHTML = customCSS;
        document.head.appendChild(styleEl);
    }

    /**
     * Build UI elements from JSON definition
     */
    buildUI(jsonDefinition, container) {
        if (!container) {
            console.error('Container not provided');
            return;
        }

        container.innerHTML = '';
        this.renderElement(jsonDefinition, container);
    }

    /**
     * Recursively render elements from JSON
     */
    renderElement(definition, parent) {
        if (!definition) return;

        // Handle arrays
        if (Array.isArray(definition)) {
            definition.forEach(def => this.renderElement(def, parent));
            return;
        }

        // Handle string (text node)
        if (typeof definition === 'string') {
            parent.appendChild(document.createTextNode(definition));
            return;
        }

        // Handle object (element definition)
        if (typeof definition === 'object') {
            const {
                type = 'div',
                className = '',
                id = '',
                style = {},
                attributes = {},
                children = [],
                text = '',
                html = '',
                events = {}
            } = definition;

            // Create element
            const el = document.createElement(type);

            // Set class and id
            if (className) el.className = className;
            if (id) el.id = id;

            // Set inline styles
            Object.entries(style).forEach(([key, value]) => {
                el.style[key] = value;
            });

            // Set attributes
            Object.entries(attributes).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });

            // Set text content
            if (text) {
                el.textContent = text;
            }

            // Set HTML content
            if (html) {
                el.innerHTML = html;
            }

            // Add children
            if (children && children.length > 0) {
                children.forEach(child => this.renderElement(child, el));
            }

            // Set event listeners
            Object.entries(events).forEach(([eventName, handler]) => {
                if (typeof handler === 'function') {
                    el.addEventListener(eventName, handler);
                }
            });

            parent.appendChild(el);
        }
    }

    /**
     * Create a custom UI from JSON
     */
    createCustomTheme(themeName, definition) {
        if (this.themes[themeName]) {
            console.warn(`Theme '${themeName}' already exists, overwriting...`);
        }

        this.themes[themeName] = definition;
        localStorage.setItem(`namos_ui_custom_${themeName}`, JSON.stringify(definition));
        
        return true;
    }

    /**
     * Load custom themes from storage
     */
    loadCustomThemes() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('namos_ui_custom_')) {
                const themeName = key.replace('namos_ui_custom_', '');
                try {
                    const definition = JSON.parse(localStorage.getItem(key));
                    this.themes[themeName] = definition;
                    console.log('Loaded custom theme:', themeName);
                } catch (err) {
                    console.error('Error loading theme:', themeName, err);
                }
            }
        });
    }

    /**
     * Delete a custom theme
     */
    deleteCustomTheme(themeName) {
        if (themeName === 'NamUI1' || themeName === 'TwoUI1') {
            console.error('Cannot delete built-in themes');
            return false;
        }

        delete this.themes[themeName];
        localStorage.removeItem(`namos_ui_custom_${themeName}`);
        
        // If deleted theme was active, switch to default
        if (this.currentTheme === themeName) {
            this.switchTheme('NamUI1');
        }

        return true;
    }

    /**
     * Export a theme as JSON
     */
    exportTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return null;

        return JSON.stringify(theme, null, 2);
    }

    /**
     * Import a theme from JSON
     */
    importTheme(themeName, jsonString) {
        try {
            const definition = JSON.parse(jsonString);
            this.createCustomTheme(themeName, definition);
            return true;
        } catch (err) {
            console.error('Error importing theme:', err);
            return false;
        }
    }
}

// Create global instance
window.UIFramework = new UIFramework();
