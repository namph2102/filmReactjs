/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "0.1rem",
        sm: "0.5rem",
        lg: "1rem",
        xl: "3rem",
        "2xl": "6rem",
      },
    },
    extend: {
      width: {
        logo: "200px",
      },
      height: {
        header: "90px",
      },
      fontSize: {
        small: "11.2px",
      },
      fontFamily: { mono: ["Monospace", "sans-serif"] },
      colors: {
        primary: "#ff971b",
        second: " #8a9eaf",
        text: "#d8d8d8",
        vip: "#ff971b",
        admin: "#5e89c9",
        member: "#ccc",
        notlike: "#bd0e0e",
      },

      backgroundColor: {
        menu: "#12171B",
        main: "#212C37",
        content: "#151D25",
        hover: "#12171b",
        third: "#224361",
        input: "#17242E",
        admin: "#383f44",
        vip: "#0e0e0e",
        member: "#333",
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
