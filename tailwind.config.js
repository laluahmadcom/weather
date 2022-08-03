/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skin: {
          main: "rgb(var(--color-main) / <alpha-value>)",
          bold: "rgb(var(--color-bold) / <alpha-value>)",
          "btn-main": "rgb(var(--color-btn-main) / <alpha-value>)",
          "btn-muted": "rgb(var(--color-btn-muted) / <alpha-value>)",
          "btn-warning": "rgb(var(--color-btn-warning) / <alpha-value>)",
        },
      },
      textColor: {
        skin: {
          base: "rgb(var(--color-text-base))",
          muted: "rgb(var(--color-text-muted))",
          bold: "rgb(var(--color-text-bold))",
          warning: "rgb(var(--color-text-warning))",
          reverse: "rgb(var(--color-text-reverse))",
        },
      },
    },
  },
  plugins: [],
};
