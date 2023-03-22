/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        logo: "200px",
      },
      height: {
        header: "90px",
      },
      fontFamily: { mono: ["Monospace", "sans-serif"] },
      colors: {
        primary: "#ff971b",
        second: " #8a9eaf",
        text: "#d8d8d8",
      },
      backgroundColor: {
        menu: "#12171B",
        main: "#212C37",
        content: "#151D25",
        hover: "#12171b",
        input: "#17242E",
      },
      backgroundImage: {
        status: "linear-gradient(to right,#ff00cc 0%,#333399 51%,#ff00cc 100%)",
        episode:
          "linear-gradient(to right,#C02425 0%,#F0CB35 51%,#C02425 100%)",
        layouthover:
          "linear-gradient(to bottom,rgba(235,20,54,0.9) 0%,rgba(123,67,151,0.9) 100%)",
        kindtitle: " linear-gradient(to right, #ff8a00, #ff2070)",
        bookmark: "linear-gradient(to right, #063458, #1c5e94);",
      },
    },
  },
  plugins: [],
};
