/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFC',
        panel: '#FFFFFF',
        accent: '#0A84FF',
        accentStrong: '#1677FF',
        text: '#0F172A',
        textSoft: '#64748B',
        muted: '#94A3B8',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(15,23,42,0.04)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
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
