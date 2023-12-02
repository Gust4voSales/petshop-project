/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        "screen-3/5": "60vh",
      },

      keyframes: {
        show: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        show: "show 0.3s ease",
      },
    },
  },
  daisyui: {
    themes: ["dark", "light", "cyberpunk", "night"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
