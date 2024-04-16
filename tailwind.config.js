module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   theme: {
     extend: {
      fontSize: {
        base: '13px'
      },
      colors: {
        label: '#111827',
        hint: '#6B7280',
        btn: '#384252',
        fill: '#9CA3B0',

      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }
