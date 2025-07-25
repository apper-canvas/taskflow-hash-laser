/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B4CFF',
          50: '#F1F0FF',
          100: '#E6E3FF',
          200: '#D4CFFF',
          300: '#B8B0FF',
          400: '#9B8AFF',
          500: '#5B4CFF',
          600: '#4A3DE6',
          700: '#3A2FCC',
          800: '#2B24B3',
          900: '#1F1B99',
        },
        secondary: {
          DEFAULT: '#FF6B6B',
          50: '#FFF2F2',
          100: '#FFE6E6',
          200: '#FFCCCC',
          300: '#FFA3A3',
          400: '#FF8A8A',
          500: '#FF6B6B',
          600: '#FF5252',
          700: '#FF3D3D',
          800: '#E63333',
          900: '#CC2929',
        },
        accent: {
          DEFAULT: '#4ECDC4',
          50: '#F0FFFE',
          100: '#E6FFFC',
          200: '#CCFFF8',
          300: '#A3FFF0',
          400: '#7AFFE8',
          500: '#4ECDC4',
          600: '#3DB3AB',
          700: '#2D9992',
          800: '#1E7F79',
          900: '#0F6660',
        },
        surface: '#F7F9FC',
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 1s ease-in-out infinite',
        'scale-up': 'scale-up 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}