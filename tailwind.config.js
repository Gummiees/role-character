module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '3xl': '2rem'
      },
      backgroundOpacity: {
        85: '0.85'
      },
      colors: {
        indigo: {
          material: '#3F51B5'
        },
        deepBlue: {
          DEFAULT: '#020033'
        }
      },
      spacing: {
        auto: 'auto'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  important: true
};
