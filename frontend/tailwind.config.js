/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#CD853F',
        'brand-dark': '#A8672F',
        bg: '#FFFFFF',
        panel: '#FFFFFF',
        sidebar: '#3A2415',
        'sidebar-text': '#E8D6C0',
        text: '#3A2A1A',
        'text-soft': '#8A7360',
        muted: '#8A7360',
        border: '#EADDC9',
        'border-soft': '#EADDC9',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(58,42,26,0.08)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(58,42,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(58,42,26,0.03) 1px, transparent 1px)',
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
