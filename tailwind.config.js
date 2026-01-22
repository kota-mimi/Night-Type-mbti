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
        'neon-pink': {
          50: '#fff0f5',
          100: '#ffe1eb',
          200: '#ffc2d7',
          300: '#ff94b3',
          400: '#ff5588',
          500: '#FF007F',
          600: '#e6006b',
          700: '#cc0057',
          800: '#b30043',
          900: '#990030',
        },
        'neon-cyan': {
          50: '#f0fffe',
          100: '#ccfffe',
          200: '#99fffe',
          300: '#5cfffe',
          400: '#22d3ee',
          500: '#00FFFF',
          600: '#00e6e6',
          700: '#00cccc',
          800: '#00b3b3',
          900: '#009999',
        },
        'electric-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7B2CBF',
          800: '#6b21a8',
          900: '#581c87',
        },
        'gold': {
          50: '#fffdf7',
          100: '#fffaeb',
          200: '#fff3c4',
          300: '#ffe888',
          400: '#ffd43b',
          500: '#FFD700',
          600: '#e6c200',
          700: '#ccad00',
          800: '#b39900',
          900: '#998500',
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
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 0, 127, 0.5), 0 0 40px rgba(255, 0, 127, 0.3), 0 0 60px rgba(255, 0, 127, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(255, 0, 127, 0.8), 0 0 60px rgba(255, 0, 127, 0.5), 0 0 90px rgba(255, 0, 127, 0.2)'
          },
        },
        'glow-cyan': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5)'
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
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glow-cyan': 'glow-cyan 2s ease-in-out infinite',
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