/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Night Type - Luxury Lounge Theme
        'midnight': {
          50: '#f5f5f7',
          100: '#e5e5e7',
          200: '#d0d0d3',
          300: '#b3b3b7',
          400: '#8e8e93',
          500: '#6e6e73',
          600: '#56565c',
          700: '#2c2c2e',
          800: '#1a1a2e',
          900: '#050510',
        },
        'amber': {
          50: '#fff8f0',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FF8C42',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'wine-red': {
          50: '#fdf2f2',
          100: '#fce8e6',
          200: '#f8d4d3',
          300: '#f3b2b0',
          400: '#eb8481',
          500: '#dc5b57',
          600: '#c63d38',
          700: '#78281F',
          800: '#7f1d1d',
          900: '#651e1e',
        },
        'warm-gold': {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#D4A574',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'deep-red': {
          50: '#fdf2f2',
          100: '#fde6e6',
          200: '#fbcfcf',
          300: '#f7a8a8',
          400: '#f07373',
          500: '#e53e3e',
          600: '#8B2635',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-15px) rotate(-2deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-18px) scale(1.05)' },
        },
        'warm-glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 25px rgba(255, 140, 66, 0.3), 0 0 45px rgba(255, 140, 66, 0.2), 0 0 65px rgba(255, 140, 66, 0.08)'
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(255, 140, 66, 0.5), 0 0 65px rgba(255, 140, 66, 0.3), 0 0 95px rgba(255, 140, 66, 0.15)'
          },
        },
        'wine-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(120, 40, 31, 0.4), 0 0 40px rgba(120, 40, 31, 0.2)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(120, 40, 31, 0.6), 0 0 60px rgba(120, 40, 31, 0.3)'
          },
        },
        'smoke': {
          '0%': { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: '0.1' },
          '50%': { transform: 'translateY(-50px) scale(1.1) rotate(180deg)', opacity: '0.3' },
          '100%': { transform: 'translateY(-100px) scale(1.2) rotate(360deg)', opacity: '0' },
        },
        'orb-float': {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '33%': { transform: 'translateX(30px) translateY(-20px) scale(1.1)' },
          '66%': { transform: 'translateX(-20px) translateY(10px) scale(0.9)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 2.5s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'warm-glow-pulse': 'warm-glow-pulse 2s ease-in-out infinite',
        'wine-glow': 'wine-glow 2s ease-in-out infinite',
        'smoke': 'smoke 8s ease-out infinite',
        'orb-float': 'orb-float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      backdropBlur: {
        '3xl': '64px',
      },
      fontFamily: {
        'serif': ['Shippori Mincho', 'Playfair Display', 'serif'],
        'sans': ['Noto Sans JP', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}