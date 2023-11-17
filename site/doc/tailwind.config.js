/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "button-hover": "0px 4px 8px rgba(134, 151, 255, 0.3)",
      },
      colors: {
        "card-1": "rgba(255, 255, 255, 1)",
        "card-2": "rgba(242, 244, 247, 1)",
        body: "rgba(62, 73, 94, 1)",
        title1: "rgba(25, 41, 69, 1)",
        title2: "rgba(255, 255, 255, 1)",
        "blue-default": "rgba(112, 132, 255, 1)",
        "blue-light1": "rgba(238, 241, 255, 1)",
        "blue-disable": "rgba(112, 132, 255, 0.5)",
        line: "rgba(211, 216, 224, 1)",
        foot: "rgba(106, 117, 135, 1)",
      },
    },
  },
  plugins: [],
};
