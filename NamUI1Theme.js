/**
 * NamUI 1 Theme Definition
 * Default built-in theme for NamOS
 */

const NamUI1Theme = {
    name: 'NamUI1',
    displayName: 'NamUI 1',
    description: 'Default NamOS UI Theme',
    version: '1.0.0',
    author: 'Nam Studio',
    
    style: {
        colors: {
            'primary-blue': '#00AAFF',
            'secondary-blue': '#AAC3FA',
            'background-light': '#F1F1F7',
            'background-dark': '#000000',
            'surface-light': '#FFFFFF',
            'surface-dark': '#1C1E2E',
            'text-primary': '#000000',
            'text-secondary': '#8E8E93',
            'glass-bg': 'rgba(255, 255, 255, 0.10)',
            'liquid-glass': 'rgba(255, 255, 255, 0.10)',
            'glass-blur': '35px',
            'glass-border-color': 'rgba(255, 255, 255, 0.3)',
            'liquid-glass-hover': 'rgba(255, 255, 255, 0.20)',
            'app-icon-size': '60px',
            'dock-height': '75px',
            'status-bar-height': '44px',
        },
        sizing: {
            'border-radius': '20px',
            'transition': 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        customCSS: `
            /* NamUI 1 specific styles */
            .namus1-app-icon {
                width: var(--app-icon-size);
                height: var(--app-icon-size);
            }
            
            .namui1-dock {
                height: var(--dock-height);
                backdrop-filter: blur(40px) saturate(200%);
            }
        `
    },

    // Home screen layout
    homeScreen: {
        layout: 'grid',
        columns: 'auto-fit, minmax(80px, 1fr)',
        gap: 'clamp(0.75rem, 3vw, 2rem)',
        align: 'start'
    },

    // Dock configuration
    dock: {
        position: 'bottom',
        height: 'var(--dock-height)',
        items: [
            { id: 'phone', label: 'Phone', icon: '📱' },
            { id: 'messages', label: 'Messages', icon: '💬' },
            { id: 'camera', label: 'Camera', icon: '📷' },
            { id: 'maps', label: 'Maps', icon: '🗺️' }
        ]
    },

    // Status bar configuration
    statusBar: {
        position: 'top',
        height: 'var(--status-bar-height)',
        showTime: true,
        showSignal: true,
        showBattery: true
    },

    // Icon appearance
    icons: {
        style: 'glass',
        corners: 'rounded',
        shadow: true,
        animation: 'float'
    },

    // Window style
    windows: {
        style: 'glass',
        corners: 'rounded',
        shadow: true,
        blur: true
    }
};

// Register theme
if (window.UIFramework) {
    window.UIFramework.registerTheme('NamUI1', NamUI1Theme);
}
