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
          DEFAULT: '#1e40af',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        sidebar: {
          DEFAULT: '#1e3a8a',
          foreground: '#f8fafc',
        },
        background: '#f8fafc',
        card: '#ffffff',
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        border: '#e2e8f0',
        muted: {
          DEFAULT: '#64748b',
          foreground: '#475569',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
