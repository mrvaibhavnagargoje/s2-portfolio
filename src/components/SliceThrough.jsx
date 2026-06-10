import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactElement } from "./ContactElement";

gsap.registerPlugin(ScrollTrigger);

export const SliceThrough = () => {
   useEffect(() => {
      var tl = gsap.timeline({
         scrollTrigger: {
            trigger: "#main",
            start: "center center",
            end: "bottom center",
            scrub: 1.6,
            pin: true,
            // markers: true,
         },
      });

      tl.fromTo(
         "#top",
         {
            top: "0%",
         },
         {
            top: "-70%",
         },
         "slice" // add same name to perform animation on same time
      )
         .fromTo(
            "#bottom",
            {
               bottom: "0%",
            },
            {
               bottom: "-70%",
            },
            "slice"
         )
         .fromTo(
            "#top-h",
            {
               top: "60vh",
            },
            {
               top: "120%",
            },
            "slice"
         )
         .fromTo(
            "#bottom-h",
            {
               bottom: "60vh",
            },
            {
               bottom: "120%",
            },
            "slice"
         )
         .fromTo(
            ".content",
            {
               paddingTop: "100vh",
            },
            {
               paddingTop: "0%",
            },
            "slice"
         );

      return () => {
         tl.revert();
      };
   }, []);

   return (
      <div
         id="main"
         className="w-full h-[120vh] relative bg-sky-600 font-extrabold overflow-hidden"
      >
         <div
            id="top"
            className="w-full h-[60vh] bg-[#f1f1f1] absolute overflow-hidden pointer-events-none"
         >
            <h1
               id="top-h"
               className="text-[20vw] uppercase absolute left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
               Excited?
            </h1>
         </div>

         <div id="center" className="content w-full h-[100vh]">
            <ContactElement />
         </div>

         <div
            id="bottom"
            className="w-full h-[60vh] bg-[#f1f1f1] absolute overflow-hidden pointer-events-none"
         >
            <h1
               id="bottom-h"
               className="text-[20vw] uppercase absolute left-[50%] translate-x-[-50%] translate-y-[50%]"
            >
               Excited?
            </h1>
         </div>
      </div>
   );
};
