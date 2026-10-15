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
        "card-1": "rgb(255, 255, 255)",
        "card-2": "rgb(242, 244, 247)",
        body: "rgb(62, 73, 94)",
        title1: "rgb(25, 41, 69)",
        title2: "rgb(255, 255, 255)",
        "blue-default": "rgb(112, 132, 255)",
        "blue-light1": "rgb(238, 241, 255)",
        "blue-disable": "rgba(112, 132, 255, 0.5)",
        line: "rgb(211, 216, 224)",
        foot: "rgb(106, 117, 135)",
      },
    },
  },
  plugins: [],
};
