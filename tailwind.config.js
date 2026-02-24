/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        primary: '#FF6A00',
        dark: {
          100: '#1A1A1A',
          200: '#141414',
          300: '#0F0F0F',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 106, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 106, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
