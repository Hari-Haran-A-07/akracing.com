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
          red: '#D90429',
          crimson: '#B00020',
          darkRed: '#780016',
          black: '#0A0A0A',
          carbon: '#111111',
          graphite: '#181818',
          card: '#1F1F1F',
          border: '#2A2A2A',
          silver: '#8A8A8A',
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        display: ['Syne', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Consolas', 'monospace'],
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
