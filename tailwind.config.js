export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        // ...
        'primary': {
          light: '#613F75',
          DEFAULT: '#613F75',
          dark: '#0e7490',
        },
        // ...
      },
    },
  },
  plugins: [],
}