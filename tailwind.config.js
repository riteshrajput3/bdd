/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romance: {
          bg: "#07030c",
          surface: "#0f0619",
          card: "rgba(22, 11, 34, 0.65)",
          border: "rgba(255, 112, 166, 0.15)",
          "border-hover": "rgba(255, 112, 166, 0.4)",
          pink: "#ff6b9d",
          rose: "#f43f5e",
          deepRose: "#be123c",
          accent: "#ff3366",
          soft: "#ffe4e9",
          muted: "#c7b8cb",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(255, 51, 102, 0.35)',
        'glow': '0 0 30px -5px rgba(255, 51, 102, 0.45)',
        'glow-lg': '0 0 50px -5px rgba(255, 51, 102, 0.6)',
        'glow-purple': '0 0 40px -5px rgba(168, 85, 247, 0.4)',
        'polaroid': '0 15px 35px -5px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 107, 157, 0.15)',
        'letter': '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(244, 63, 94, 0.2)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.18)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
