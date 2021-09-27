module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      '3xl': '2rem',
    },
    extend: {
      backgroundOpacity: {
        85: '0.85',
      },
      colors: {
        indigo: {
          material: '#3F51B5',
        },
        deepBlue: {
          DEFAULT: '#020033',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
