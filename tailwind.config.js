module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
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

      }),
    extend: {
      backgroundImage:{
        'img-for-banner':"url('../images/Banner.png')",
        'img-for-salh':"url('../images/salh.png')"
        ,'img-for-backg':"url('../images/sun.png')"
        ,'img-for-blue':"url('../images/blue.jpeg')"
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
