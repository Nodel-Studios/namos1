/**
 * NamOS Theme Creation Tutorial
 * How to Create Custom UI Themes Using JSON
 */

# Creating Custom UI Themes in NamOS

## Quick Start

### Method 1: Using the UI Builder App (Easiest)

1. Open **UI Builder** from your home screen
2. Click "New Theme"
3. Fill in the metadata (name, author, description)
4. Use the tabs to customize:
   - **Colors** - Change primary, background, text colors
   - **Sizing** - Adjust icon sizes, dock height, border radius
   - **CSS** - Add advanced styling
5. Click "Preview" to see your changes
6. Click "Save Theme" to keep your theme

### Method 2: Manual JSON Creation

Create a file called `my-theme.json`:

```json
{
  "name": "MyTheme",
  "displayName": "My Awesome Theme",
  "description": "A custom theme inspired by modern design",
  "version": "1.0.0",
  "author": "Your Name",
  "style": {
    "colors": {
      "primary-blue": "#FF6B6B",
      "secondary-blue": "#FFB3B3",
      "background-dark": "#1A1A1A",
      "surface-light": "#FFFFFF",
      "text-primary": "#000000",
      "text-secondary": "#666666"
    },
    "sizing": {
      "border-radius": "24px",
      "app-icon-size": "70px",
      "dock-height": "80px",
      "status-bar-height": "44px"
    },
    "customCSS": `
      /* Your custom CSS here */
      .custom-element {
        background: linear-gradient(135deg, #FF6B6B, #FFB3B3);
        border-radius: 20px;
      }
    `
  }
}
```

## Complete Theme Example

```json
{
  "name": "NordTheme",
  "displayName": "Nord",
  "description": "Arctic, north-bluish color palette theme",
  "version": "1.0.0",
  "author": "User",
  
  "style": {
    "colors": {
      "primary-blue": "#88C0D0",
      "secondary-blue": "#81A1C1",
      "background-light": "#ECEFF4",
      "background-dark": "#2E3440",
      "surface-light": "#FFFFFF",
      "surface-dark": "#3B4252",
      "text-primary": "#2E3440",
      "text-secondary": "#4C566A",
      "glass-bg": "rgba(76, 86, 106, 0.15)",
      "glass-border-color": "rgba(136, 192, 208, 0.3)",
      "app-icon-size": "65px",
      "dock-height": "75px",
      "status-bar-height": "44px"
    },
    
    "sizing": {
      "border-radius": "18px",
      "transition": "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    
    "customCSS": `
      .nord-app-icon {
        background: linear-gradient(135deg, rgba(136, 192, 208, 0.1), rgba(129, 161, 193, 0.1));
      }
      
      .nord-dock {
        background: rgba(46, 52, 64, 0.9);
      }
    `
  }
}
```

## Color Palette Ideas

### Material Design
```json
"colors": {
  "primary-blue": "#1976D2",
  "background-dark": "#121212",
  "surface-dark": "#1E1E1E"
}
```

### Dracula
```json
"colors": {
  "primary-blue": "#BD93F9",
  "background-dark": "#282A36",
  "text-secondary": "#6272A4"
}
```

### Solarized
```json
"colors": {
  "primary-blue": "#268BD2",
  "background-dark": "#002B36",
  "text-primary": "#FDF6E3"
}
```

### Synthwave
```json
"colors": {
  "primary-blue": "#FF0080",
  "background-dark": "#1D1B55",
  "secondary-blue": "#FF00FF"
}
```

## Tips for Great Themes

### 1. Color Harmony
- Use complementary colors
- Ensure good contrast ratios
- Test with accessibility tools

### 2. Consistent Sizing
- Icon sizes should be multiples of 10px (60px, 70px, 80px)
- Dock height typically 70-85px
- Border radius 16-28px for modern look

### 3. Performance
- Minimize custom CSS
- Avoid complex gradients
- Use CSS variables instead of hardcoded values

### 4. Accessibility
- Ensure text is readable on all backgrounds
- Use high contrast ratios (WCAG AA minimum)
- Test on different color blindness palettes

## Testing Your Theme

1. **Open Settings** > **Appearance** > **UI Framework Theme**
2. **Import** your theme JSON file
3. **Click** to switch to your theme
4. Test all apps and ensure readability
5. Check on different screen sizes
6. Verify animations run smoothly

## Sharing Your Theme

### Export Process
1. Open Settings > Appearance
2. Find your theme
3. Click "Export" to download JSON

### Share with Others
- Upload to a theme repository
- Share on social media
- Include in documentation

## Advanced Customization

### Adding Animations
```json
"customCSS": `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  .animated-element {
    animation: pulse 2s infinite;
  }
`
```

### Gradient Backgrounds
```json
"customCSS": `
  .gradient-app-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
`
```

### Glass Morphism
```json
"customCSS": `
  .glass-element {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`
```

## CSS Variable Reference

All themes support these CSS variables:

```css
/* Colors */
--primary-blue
--secondary-blue
--background-light
--background-dark
--surface-light
--surface-dark
--text-primary
--text-secondary
--glass-bg
--glass-border-color

/* Sizing */
--app-icon-size
--dock-height
--status-bar-height
--border-radius

/* Effects */
--transition
--shadow-light
--shadow-heavy
--glass-blur
```

## Troubleshooting

### Theme Not Loading
- Check JSON syntax is valid
- Verify all required fields are present
- Check browser console for errors

### Colors Not Applying
- Ensure color values are valid hex codes
- Check variable names match exactly
- Clear browser cache and reload

### Theme Too Dark/Light
- Adjust text-primary and text-secondary
- Increase contrast between background and surface colors
- Use color contrast checker tool

## Resources

- [Color Palette Generator](https://coolors.co)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Gradient Generator](https://cssgradient.io)
- [CSS Filter Playground](https://www.cssfilters.co/)

---

**Happy Theme Creating!** 🎨

Have fun customizing NamOS to match your style!
