/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         screens: {
            xxs: "360px",
            xs: "420px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1440px",
         },
         keyframes: {
            animate: {
               from: { transform: "rotate(0deg)" },
               to: { transform: "rotate(360deg)" },
            },
         },
         animation: {
            animate: "animate 5s linear infinite",
         },
      },
   },
   plugins: [],
};
