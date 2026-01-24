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
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      fontFamily: {
        'serif': ['Shippori Mincho', 'Playfair Display', 'serif'],
        'sans': ['Noto Sans JP', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}