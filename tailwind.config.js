/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rsa-blue': {
          DEFAULT: '#115997',
          dark: '#273373',
          light: '#84d2f2',
          medium: '#2692cc',
        }
      },
      fontFamily: {
        'display': ['Merriweather', 'serif'],
        'body': ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
