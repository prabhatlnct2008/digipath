/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Navy blue palette with proper gradation
        primary: {
          50: '#f0f5fa',
          100: '#dae5f2',
          200: '#b8cce6',
          300: '#8aadd4',
          400: '#5a8ac0',
          500: '#3d6ea8',
          600: '#2c5282',
          700: '#1e3a5f',
          800: '#162d4a',
          900: '#0f1f33',
          950: '#091525',
        },
        // Secondary: Brighter blue for accents
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Surface colors for backgrounds
        surface: {
          white: '#ffffff',
          gray: '#f8fafc',
          dark: '#1e293b',
        },
        // Text colors
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
          inverse: '#ffffff',
        },
        // Border colors
        border: {
          light: '#e2e8f0',
          DEFAULT: '#cbd5e1',
          dark: '#94a3b8',
          focus: '#3b82f6',
        },
        // Status colors
        status: {
          success: '#16a34a',
          'success-light': '#dcfce7',
          warning: '#d97706',
          'warning-light': '#fef3c7',
          danger: '#dc2626',
          'danger-light': '#fee2e2',
          info: '#2563eb',
          'info-light': '#dbeafe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
        'card-title': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px -4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px -8px rgba(0, 0, 0, 0.15)',
        'button': '0 2px 4px rgba(30, 58, 95, 0.2)',
        'button-hover': '0 4px 8px rgba(30, 58, 95, 0.25)',
        'header': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'micro': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'toast-in': 'toastIn 0.3s ease-out forwards',
        'toast-out': 'toastOut 0.3s ease-in forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'bounce-slow': 'bounceSlow 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-100%) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
        },
        toastOut: {
          '0%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
          '100%': { opacity: '0', transform: 'translateY(-100%) translateX(-50%)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
