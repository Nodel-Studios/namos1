/**
 * TwoUI 1 Theme Definition
 * OneUI 8 inspired theme for NamOS
 */

const TwoUI1Theme = {
    name: 'TwoUI1',
    displayName: 'TwoUI 1',
    description: 'OneUI 8 inspired theme with modern Material Design',
    version: '1.0.0',
    author: 'Nam Studio',
    
    style: {
        colors: {
            'primary-blue': '#2FB5FF',
            'secondary-blue': '#BBDEFB',
            'accent-purple': '#B39DDB',
            'background-light': '#F5F5F5',
            'background-dark': '#0A0E27',
            'surface-light': '#FFFFFF',
            'surface-dark': '#1A1F3A',
            'text-primary': '#000000',
            'text-secondary': '#616161',
            'glass-bg': 'rgba(255, 255, 255, 0.08)',
            'liquid-glass': 'rgba(255, 255, 255, 0.12)',
            'glass-blur': '20px',
            'glass-border-color': 'rgba(255, 255, 255, 0.2)',
            'liquid-glass-hover': 'rgba(255, 255, 255, 0.15)',
            'app-icon-size': '70px',
            'dock-height': '80px',
            'status-bar-height': '44px',
            'shadow-color': 'rgba(0, 0, 0, 0.15)',
        },
        sizing: {
            'border-radius': '24px',
            'transition': 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
            'corner-radius-small': '12px',
        },
        customCSS: `
            /* TwoUI 1 Theme - OneUI 8 Inspired */
            :root.twoui1-theme {
                --primary-gradient: linear-gradient(135deg, #2FB5FF 0%, #5A67F2 100%);
                --surface-gradient: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
            }
            
            .twoui1-app-icon {
                width: var(--app-icon-size);
                height: var(--app-icon-size);
                border-radius: var(--border-radius);
                background: var(--liquid-glass);
                backdrop-filter: blur(var(--glass-blur));
                border: 1px solid var(--glass-border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                transition: var(--transition);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .twoui1-app-icon:hover {
                transform: scale(1.1) translateY(-4px);
                background: var(--liquid-glass-hover);
                box-shadow: 0 12px 32px var(--shadow-color);
            }
            
            .twoui1-app-icon::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--surface-gradient);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .twoui1-app-icon:hover::before {
                opacity: 1;
            }
            
            .twoui1-dock {
                height: var(--dock-height);
                background: var(--liquid-glass);
                backdrop-filter: blur(30px);
                border-top: 1px solid var(--glass-border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                padding: 12px;
                border-radius: 24px 24px 0 0;
            }
            
            .twoui1-dock-icon {
                width: 56px;
                height: 56px;
                border-radius: 18px;
                background: var(--liquid-glass);
                backdrop-filter: blur(15px);
                border: 1px solid var(--glass-border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .twoui1-dock-icon:hover {
                transform: scale(1.15) translateY(-8px);
                background: var(--liquid-glass-hover);
            }
            
            .twoui1-status-bar {
                height: var(--status-bar-height);
                background: var(--liquid-glass);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--glass-border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 16px;
            }
            
            .twoui1-window {
                background: var(--liquid-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border-color);
                border-radius: var(--border-radius);
                box-shadow: 0 8px 24px var(--shadow-color);
                overflow: hidden;
            }
        `
    },

    // Home screen layout
    homeScreen: {
        layout: 'grid',
        columns: 'auto-fit, minmax(90px, 1fr)',
        gap: '14px',
        align: 'start',
        padding: '16px'
    },

    // Dock configuration
    dock: {
        position: 'bottom',
        height: 'var(--dock-height)',
        borderRadius: '24px 24px 0 0',
        items: [
            { id: 'phone', label: 'Phone', icon: '📞' },
            { id: 'messages', label: 'Messages', icon: '💬' },
            { id: 'gallery', label: 'Gallery', icon: '🖼️' },
            { id: 'browser', label: 'Browser', icon: '🌐' }
        ],
        className: 'twoui1-dock'
    },

    // Status bar configuration
    statusBar: {
        position: 'top',
        height: 'var(--status-bar-height)',
        showTime: true,
        showSignal: true,
        showBattery: true,
        className: 'twoui1-status-bar'
    },

    // Icon appearance
    icons: {
        style: 'glass',
        corners: 'rounded',
        shadow: true,
        animation: 'float',
        iconClassName: 'twoui1-app-icon'
    },

    // Window style
    windows: {
        style: 'glass',
        corners: 'rounded',
        shadow: true,
        blur: true,
        className: 'twoui1-window'
    },

    // OneUI 8 specific features
    features: {
        curvatureCorners: true,
        smoothAnimations: true,
        enhancedBlur: true,
        colorfulAccents: true
    }
};

// Register theme
if (window.UIFramework) {
    window.UIFramework.registerTheme('TwoUI1', TwoUI1Theme);
}
