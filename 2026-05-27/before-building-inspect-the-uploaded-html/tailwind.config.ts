const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#242424",
        bone: "#f4efe6",
        gold: "#b99a58",
        emerald: "#1f6f5b"
      },
      fontFamily: {
        editorial: ["Georgia", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
