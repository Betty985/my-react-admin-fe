/** @type {import('tailwindcss').Config} */
const primaryColor = 'black'
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    spacing: {
      'some key': '16px',
    },
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: primaryColor,
      },
      theme: {
        screens: {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
        },
      }
    }
  },
  corePlugins: {
    preflight: false,
  }
}

