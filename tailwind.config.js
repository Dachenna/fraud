module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind scans all components
  theme: {
    extend: {
      container:{
        center: true,
        padding:{
          DEFUALT: "1rem",
          sm: "2rem",
        }
      }
    },
  },
  plugins: [],
};
