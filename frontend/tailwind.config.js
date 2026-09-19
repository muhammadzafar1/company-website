/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-page': '#FFF8F0',
        'surface-light': '#FAF0E6',
        'surface-light-hover': '#F5E6D3',
        'surface-dark': '#3B2416',
        'surface-darker': '#2B1A10',
        'text-on-dark-heading': '#FFFFFF',
        'text-on-dark-body': '#F1DFC9',
        'text-on-dark-muted': '#D9BFA3',
        'text-on-light-heading': '#2B1A10',
        'text-on-light-body': '#6B4A35',
        'text-on-light-muted': '#7D5C47',
        'link-on-light': '#8A4B1F',
        'link-on-light-hover': '#6B3A15',
        accent: '#E0A96D',
        'accent-hover': '#C98A45',
        'accent-soft': '#F6E3C8',
        'on-accent': '#2B1A10',
        'border-light': '#E8D5BF',
        'border-dark': '#5A3A26',
        'focus-ring': '#E0A96D',
        success: {
          bg: '#E6F4E7',
          text: '#1F6B33',
        },
        warning: {
          bg: '#FDEBD3',
          text: '#9A4B00',
        },
        danger: {
          bg: '#FDECEC',
          text: '#9B1C1C',
        },
        'badge-get': {
          bg: '#E6F4E7',
          text: '#1F6B33',
        },
        'badge-post': {
          bg: '#FDEBD3',
          text: '#9A4B00',
        },
        brand: {
          DEFAULT: '#E0A96D',
          dark: '#C98A45',
          light: '#F6E3C8',
        },
        background: '#FFF8F0',
        surface: '#FAF0E6',
        dark: {
          DEFAULT: '#3B2416',
          card: '#2B1A10',
        },
        text: {
          primary: '#2B1A10',
          muted: '#7D5C47',
          onDark: '#FFFFFF',
          onDarkMuted: '#D9BFA3',
        },
        border: '#E8D5BF',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(43, 26, 16, 0.08)',
        card: '0 4px 14px rgba(43, 26, 16, 0.10)',
        hover: '0 8px 22px rgba(43, 26, 16, 0.18)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(43,26,16,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(43,26,16,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fade: 'fade 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};
