const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'ga-maamli': ['"Ga Maamli"', 'sans-serif'],
      },
      colors: {
        crimson: '#dc143c',
      },
    },
  },
  plugins: [],
});
