/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        glow: "0 6px 20px rgba(124,58,237,0.16), 0 2px 6px rgba(6,182,212,0.06)",
      },
    },
  },
  plugins: [],
};
