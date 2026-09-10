/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#020617',
        deep: '#06152D',
        panel: '#081B35',
        accent: '#0A84FF',
        accentStrong: '#1677FF',
        blueGlow: '#2563EB',
        textSoft: '#CBD5E1',
        textMuted: '#94A3B8',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(78, 178, 255, 0.25), 0 20px 60px rgba(10, 132, 255, 0.2)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
