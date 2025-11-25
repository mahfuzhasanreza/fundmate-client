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
          50: '#fdf5fe',
          100: '#fbeafc',
          200: '#f7d5f8',
          300: '#f3b9f4',
          400: '#ea8ee9',
          500: '#DD7BDF',
          600: '#d158d3',
          700: '#b63fb9',
          800: '#933398',
          900: '#792b7c',
        },
        secondary: {
          50: '#f7f9ff',
          100: '#eff3ff',
          200: '#dfe7ff',
          300: '#cdd8ff',
          400: '#B3BFFF',
          500: '#99a6ff',
          600: '#7a85f5',
          700: '#5f67e0',
          800: '#4d52b8',
          900: '#414592',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
