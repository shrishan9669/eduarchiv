import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'rotate-3d': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'comeleft':{
          '0%':{transform:'translateY(100%)',opacity:'0'},
          '100%':{transform:'translateY(1)',opacity:'1'}

        },
        'cardleft':{
          '0%':{transform:'translateX(-100%)',opacity:'0'},
          '100%':{transform:'translateX(1)',opacity:'1'}
        },
        'cardright':{
          '0%':{transform:'translateX(100%)',opacity:'0'},
          '100%':{transform:'translateX(1)',opacity:'1'}
        },
        'newheader':{
          '0%':{transform:'translateY(100%)',opacity:'0'},
          '100%':{transform:'translateY(1)',opacity:'1'}
        }

      },
      animation:{
        'rotate-3d':'rotate-3d 2s  linear infinite',
        'comeleft':'comeleft 0.5s linear ',
        'cardleft':'cardleft 2s linear',
        'cardright':'cardright 2s linear',
        'newheader':'newheader 0.4s linear'
      }
    },
  },
  plugins: [],
}

