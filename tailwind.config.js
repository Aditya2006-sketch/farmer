/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        kisan: {
          25: '#F7FAF7',
          50: '#F1F8F1',
          100: '#E1F0E2',
          200: '#C3E2C6',
          300: '#97CC9C',
          400: '#65AF6D',
          500: '#3F934A',
          600: '#2F7B3A',
          700: '#256130',
          800: '#1F4E29',
          900: '#153A1D',
          950: '#0D2413',
        },
        wheat: {
          50: '#FDF8ED',
          100: '#FAEECB',
          200: '#F4DB97',
          300: '#EDC25C',
          400: '#E6A932',
          500: '#D98F1F',
          600: '#B96F18',
        },
        clay: {
          50: '#FDF3EC',
          100: '#FBE3D0',
          400: '#E88F4F',
          500: '#DC6F2C',
          600: '#BD5820',
        },
        rose: {
          50: '#FDECEC',
          400: '#E5645E',
          500: '#D6423C',
          600: '#B7302B',
        },
        ink: {
          50: '#F6F7F6',
          100: '#E9ECE9',
          400: '#7C877D',
          500: '#5B655C',
          600: '#454E46',
          700: '#333A34',
          800: '#232823',
          900: '#171B17',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,27,23,0.04), 0 8px 24px -12px rgba(23,27,23,0.10)',
        popover: '0 12px 32px -8px rgba(23,27,23,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
