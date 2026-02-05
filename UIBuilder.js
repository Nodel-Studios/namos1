/**
 * UIBuilder - Allows users to create custom UI themes
 */

class UIBuilder {
    constructor() {
        this.currentEditingTheme = null;
        this.themeEditor = null;
    }

    /**
     * Start creating a new theme
     */
    startNewTheme(baseName = 'CustomUI') {
        const themeName = `${baseName}_${Date.now()}`;
        
        const baseTheme = window.UIFramework.getTheme('NamUI1') || {};
        
        this.currentEditingTheme = {
            name: themeName,
            displayName: baseName,
            description: 'Custom UI Theme',
            version: '1.0.0',
            author: 'User',
            style: JSON.parse(JSON.stringify(baseTheme.style || {}))
        };

        return themeName;
    }

    /**
     * Edit an existing theme
     */
    loadThemeForEditing(themeName) {
        const theme = window.UIFramework.getTheme(themeName);
        if (!theme) return false;

        this.currentEditingTheme = JSON.parse(JSON.stringify(theme));
        return true;
    }

    /**
     * Get the JSON of the current editing theme
     */
    getCurrentThemeJSON() {
        return JSON.stringify(this.currentEditingTheme, null, 2);
    }

    /**
     * Update color in the current theme
     */
    updateColor(colorName, colorValue) {
        if (!this.currentEditingTheme) return false;
        
        if (!this.currentEditingTheme.style.colors) {
            this.currentEditingTheme.style.colors = {};
        }

        this.currentEditingTheme.style.colors[colorName] = colorValue;
        return true;
    }

    /**
     * Update sizing in the current theme
     */
    updateSizing(sizeName, sizeValue) {
        if (!this.currentEditingTheme) return false;
        
        if (!this.currentEditingTheme.style.sizing) {
            this.currentEditingTheme.style.sizing = {};
        }

        this.currentEditingTheme.style.sizing[sizeName] = sizeValue;
        return true;
    }

    /**
     * Update custom CSS
     */
    updateCustomCSS(customCSS) {
        if (!this.currentEditingTheme) return false;
        
        if (!this.currentEditingTheme.style) {
            this.currentEditingTheme.style = {};
        }

        this.currentEditingTheme.style.customCSS = customCSS;
        return true;
    }

    /**
     * Update metadata
     */
    updateMetadata(metadata) {
        if (!this.currentEditingTheme) return false;

        Object.assign(this.currentEditingTheme, metadata);
        return true;
    }

    /**
     * Save the current theme
     */
    saveCurrentTheme() {
        if (!this.currentEditingTheme) return false;

        const themeName = this.currentEditingTheme.name;
        window.UIFramework.createCustomTheme(themeName, this.currentEditingTheme);
        
        return themeName;
    }

    /**
     * Preview the current theme
     */
    previewCurrentTheme() {
        if (!this.currentEditingTheme) return false;

        // Temporarily register the theme
        window.UIFramework.registerTheme('__preview__', this.currentEditingTheme);
        window.UIFramework.switchTheme('__preview__');

        return true;
    }

    /**
     * Reset preview
     */
    resetPreview() {
        window.UIFramework.switchTheme('NamUI1');
    }

    /**
     * Export current theme as JSON
     */
    exportThemeJSON() {
        return this.getCurrentThemeJSON();
    }

    /**
     * Import and edit a theme from JSON
     */
    importThemeJSON(jsonString) {
        try {
            this.currentEditingTheme = JSON.parse(jsonString);
            return true;
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return false;
        }
    }

    /**
     * Get UI builder HTML
     */
    getUIBuilderHTML() {
        return `
            <div class="ui-builder-container">
                <div class="builder-section">
                    <h3>Theme Creator</h3>
                    
                    <div class="builder-tabs">
                        <button class="tab-btn active" data-tab="metadata">Info</button>
                        <button class="tab-btn" data-tab="colors">Colors</button>
                        <button class="tab-btn" data-tab="sizing">Sizing</button>
                        <button class="tab-btn" data-tab="css">CSS</button>
                        <button class="tab-btn" data-tab="preview">Preview</button>
                    </div>

                    <div id="metadata-tab" class="tab-content active">
                        <label>Display Name: <input type="text" id="builder-display-name" placeholder="My Custom Theme"></label>
                        <label>Description: <textarea id="builder-description" placeholder="Theme description"></textarea></label>
                        <label>Author: <input type="text" id="builder-author" placeholder="Your name"></label>
                    </div>

                    <div id="colors-tab" class="tab-content">
                        <div class="colors-editor">
                            <label>Primary Color: <input type="color" id="builder-primary-blue"></label>
                            <label>Background: <input type="color" id="builder-background-dark"></label>
                            <label>Text: <input type="color" id="builder-text-primary"></label>
                            <label>Glass BG: <input type="color" id="builder-glass-bg"></label>
                            <!-- More colors can be added dynamically -->
                        </div>
                    </div>

                    <div id="sizing-tab" class="tab-content">
                        <div class="sizing-editor">
                            <label>Border Radius: <input type="text" id="builder-border-radius" placeholder="20px"></label>
                            <label>App Icon Size: <input type="text" id="builder-app-icon-size" placeholder="60px"></label>
                            <label>Dock Height: <input type="text" id="builder-dock-height" placeholder="75px"></label>
                        </div>
                    </div>

                    <div id="css-tab" class="tab-content">
                        <div class="css-editor">
                            <label>Custom CSS:</label>
                            <textarea id="builder-custom-css" placeholder="/* Your custom CSS here */" style="width: 100%; height: 300px; font-family: monospace;"></textarea>
                        </div>
                    </div>

                    <div id="preview-tab" class="tab-content">
                        <div class="preview-area">
                            <p>Click "Save & Preview" to see your theme in action</p>
                            <button id="builder-preview-btn" class="action-btn">Save & Preview</button>
                            <button id="builder-reset-preview-btn" class="action-btn">Reset Preview</button>
                        </div>
                    </div>

                    <div class="builder-actions">
                        <button id="builder-save-btn" class="action-btn save-btn">Save Theme</button>
                        <button id="builder-import-btn" class="action-btn">Import JSON</button>
                        <button id="builder-export-btn" class="action-btn">Export JSON</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Create global instance
window.UIBuilder = new UIBuilder();
