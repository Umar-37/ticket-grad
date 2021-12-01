module.exports = {
  daisyui: {
      styled: true,
      themes: "light",
      rtl: false,
    },
  mode:'',
  purge: [
  './public/**/*.html',
  './src/**/*.{js,jsx,ts,tsx,vue}',  './public/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  
    
      fill: theme => ({

       'red': theme('colors.red.500'),

       'white': theme('colors.white.100'),

       'green': theme('colors.green.500'),

       'blue': theme('colors.blue.500'),

     }),
         gradientColorStops: theme => ({


       'primary': '#3490dc',

       'secondary': '#ffed4a',

       'danger': '#e3342f',

       'from1':'#FFEFBA',
       'to1':'#FFFFFF',

       'from2':'#005AA7',
       'to2':'#FFFDE4',

       'ob':'#bdc3c7',
       'lb':'#2c3e50',
       'white':'#FFFFFF'
      }),
    extend: {
       zIndex: {

         '-1': '-1',
         '-2': '-2',
         '-99': '99',
        },
      backgroundImage:{
        'img-for-banner':"url('../images/Banner.png')",
        'img-for-salh':"url('../images/salh.png')"
        ,'img-for-backg':"url('../images/sun.png')"
        ,'img-for-blue':"url('../images/blue.jpeg')"
        
      } , gridTemplateColumns: {
        // Simple 16 column grid

       '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration

       'footer': '200px minmax(900px, 1fr) 100px',
      }
    },
   
  },
  variants: {
    extend: {},
  },
  plugins: [
   require('daisyui') 
  ],
}
