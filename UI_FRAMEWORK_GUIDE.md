/**
 * NamOS Documentation
 * JSON-Based UI Framework Architecture
 * 
 * Last Updated: February 5, 2026
 */

# NamOS 1 - Dynamic UI Framework

## Overview

NamOS has been refactored to use a modern, extensible JSON-based UI framework that allows users to:
- Switch between pre-built themes (NamUI 1, TwoUI 1)
- Create custom UI themes using JSON
- Export and import themes
- Build custom UI without coding knowledge

## Architecture

### Core Components

#### 1. **UIFramework.js**
The main engine that manages themes and UI rendering.

**Key Methods:**
- `init()` - Initialize the framework
- `registerTheme(themeName, themeDefinition)` - Register a new theme
- `switchTheme(themeName)` - Activate a theme
- `getAllThemes()` - Get list of available themes
- `buildUI(jsonDefinition, container)` - Render UI from JSON
- `renderElement(definition, parent)` - Recursively render elements
- `createCustomTheme(themeName, definition)` - Create and save custom theme
- `loadCustomThemes()` - Load themes from localStorage
- `deleteCustomTheme(themeName)` - Remove a custom theme
- `exportTheme(themeName)` - Export theme as JSON
- `importTheme(themeName, jsonString)` - Import theme from JSON

#### 2. **NamUI1Theme.js**
Default built-in theme that maintains the original NamOS design.

**Includes:**
- Color definitions (primary-blue, secondary-blue, etc.)
- Sizing variables (app-icon-size, dock-height, status-bar-height)
- Custom CSS for NamUI 1 specific styling
- Home screen and dock configuration
- Icon and window appearance settings

#### 3. **TwoUI1Theme.js**
OneUI 8 inspired theme with modern Material Design aesthetics.

**Includes:**
- Updated color palette inspired by Samsung OneUI 8
- Smoother animations and transitions
- Enhanced blur effects
- Curvature-based corner radius
- OneUI 8 specific features (colorful accents, smooth animations)
- Glass morphism effects matching modern design trends

#### 4. **UIBuilder.js**
Utility class for creating and editing custom UI themes.

**Key Methods:**
- `startNewTheme(baseName)` - Create new theme from scratch
- `loadThemeForEditing(themeName)` - Load existing theme for editing
- `getCurrentThemeJSON()` - Export current editing theme
- `updateColor(colorName, colorValue)` - Update theme color
- `updateSizing(sizeName, sizeValue)` - Update sizing values
- `updateCustomCSS(customCSS)` - Add custom CSS
- `previewCurrentTheme()` - Preview changes in real-time
- `saveCurrentTheme()` - Save current theme
- `getUIBuilderHTML()` - Get builder interface HTML

## Theme Structure

All themes follow this JSON structure:

```json
{
  "name": "ThemeName",
  "displayName": "Display Name",
  "description": "Theme description",
  "version": "1.0.0",
  "author": "Author Name",
  "style": {
    "colors": {
      "primary-blue": "#00AAFF",
      "background-dark": "#000000",
      ...
    },
    "sizing": {
      "border-radius": "20px",
      "app-icon-size": "60px",
      ...
    },
    "customCSS": "/* Additional CSS rules */"
  },
  "homeScreen": {
    "layout": "grid",
    "columns": "auto-fit, minmax(80px, 1fr)",
    ...
  },
  "dock": {
    "position": "bottom",
    "height": "var(--dock-height)",
    ...
  },
  "statusBar": { ... },
  "icons": { ... },
  "windows": { ... }
}
```

## Using the UI Framework

### Switching Themes (User)

In Settings > Appearance > UI Framework Theme, users can click on a theme to switch:
```javascript
await window.UIFramework.switchTheme('TwoUI1');
```

### Creating Custom Themes (Developer)

```javascript
const customTheme = {
  name: 'MyTheme',
  displayName: 'My Custom Theme',
  description: 'My custom NamOS theme',
  version: '1.0.0',
  author: 'Your Name',
  style: {
    colors: {
      'primary-blue': '#FF0000',
      'background-dark': '#FFFFFF',
      ...
    },
    sizing: {
      'border-radius': '16px',
      ...
    }
  },
  ...
};

// Register and use
window.UIFramework.registerTheme('MyTheme', customTheme);
await window.UIFramework.switchTheme('MyTheme');
```

### Builder UI

The UIBuilder app allows non-technical users to create themes through a visual interface:

1. **Metadata Tab** - Set theme name, description, author
2. **Colors Tab** - Edit color values with color picker
3. **Sizing Tab** - Adjust spacing and sizes
4. **CSS Tab** - Add custom CSS for advanced styling
5. **Preview Tab** - See changes in real-time
6. **Export/Import** - Share themes as JSON files

## Removed Features

- **DN Bank** - Legacy banking service
- **DN Services Panel** - Legacy service management
- **DN Chat** - Legacy chat application

These have been removed to streamline the codebase and make room for the new JSON-based architecture.

## Integration with Settings

In the System Settings app (Settings > Appearance):

```html
<!-- UI Theme Selector -->
<div id="theme-NamUI1" class="ui-theme-option" ...>
  NamUI 1 (Default)
</div>
<div id="theme-TwoUI1" class="ui-theme-option" ...>
  TwoUI 1 (OneUI 8 Style)
</div>
```

Clicking a theme triggers:
```javascript
await window.UIFramework.switchTheme(themeName);
```

## Dynamic Features

### localStorage Storage
- Current theme preference: `namos_ui_theme`
- Custom themes: `namos_ui_custom_{themeName}`

### Real-time Updates
- Switching themes immediately applies CSS variables
- All active windows update colors dynamically
- No page reload required

### Custom Theme Management
- Users can create unlimited custom themes
- Themes can be exported as JSON files
- Themes can be imported from JSON files
- Built-in themes (NamUI1, TwoUI1) cannot be deleted

## Future Enhancements

1. **Theme Marketplace** - Share and discover themes from the community
2. **Live Preview** - Edit themes with instant visual feedback
3. **Theme Templates** - Pre-made templates to build upon
4. **UI Animation Editor** - Customize transition animations
5. **Cloud Sync** - Sync themes across devices

## Technical Details

### CSS Variable Application
```javascript
// Applied when theme switches
const root = document.documentElement;
root.style.setProperty('--primary-blue', '#00AAFF');
root.style.setProperty('--border-radius', '20px');
```

### JSON-to-UI Rendering
```javascript
// Recursive element rendering from JSON
renderElement({
  type: 'div',
  className: 'container',
  children: [
    { type: 'h1', text: 'Title' },
    { type: 'button', text: 'Click me', events: { click: handler } }
  ]
}, parent);
```

## Best Practices

1. **Always use CSS variables** for colors and sizing in custom themes
2. **Follow the naming convention** (kebab-case with hyphens)
3. **Include fallback values** for all custom CSS
4. **Test themes** on different screen sizes
5. **Document custom features** in the theme description

## Support

For issues or questions about the UI Framework:
1. Check the theme JSON structure
2. Verify CSS variable names match theme definitions
3. Test in different browsers
4. Review console logs for errors

---

**Version:** 1.0.0
**Framework:** NamOS UI Framework v1
**Last Updated:** February 5, 2026
