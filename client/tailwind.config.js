/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          red: '#E10600',
          brightRed: '#FF1A14',
          darkRed: '#780000',
          crimson: '#C90000',
          black: '#050505',
          deepBlack: '#080808',
          carbon: '#0D0D0D',
          dark: '#111111',
          surface: '#151515',
          surface2: '#1B1B1B',
          surface3: '#222222',
          card: '#151515',
          border: '#222222',
          silver: '#C0C0C0',
          lightSilver: '#E0E0E0',
          titanium: '#8B8B8B',
          graphite: '#353535',
          light: '#F5F5F5',
          softWhite: '#E8E8E8',
          telemetryBlue: '#1677FF',
          telemetryCyan: '#00A8FF',
          telemetryNavy: '#0B4F8A',
        },
        gray: {
          100: '#F1F1F1',
          200: '#D8D8D8',
          300: '#B8B8B8',
          400: '#969696',
          500: '#777777',
          600: '#5A5A5A',
          700: '#3D3D3D',
          800: '#292929',
          900: '#171717',
        }
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'Oswald', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-sweep': 'laserSweep 2s ease-in-out infinite',
      },
      keyframes: {
        laserSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
