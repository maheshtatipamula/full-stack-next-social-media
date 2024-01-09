/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        c4fff9: "#c4fff9",
        ceaef: "#9ceaef",
        d8d6: "#68d8d6",
      },

      aspectRatio: {
        "4/3": "4 / 3",
        "4/4": "4/4",
      },
    },

    plugins: [
      // ...
      require("@tailwindcss/forms"),
    ],
  },

  plugins: [require("tailwindcss-scrollbar")],
};
