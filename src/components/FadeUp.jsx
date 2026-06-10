import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type"; // Ensure you have this installed

gsap.registerPlugin(ScrollTrigger);

export const FadeUp = ({
   children,
   triggerClass = "fade-up",
   duration = 1.25,
   stagger = 0.05,
}) => {
   const textRef = useRef(null);

   useEffect(() => {
      const linesText = textRef.current.querySelectorAll(`.${triggerClass}`);

      linesText.forEach((lineText) => {
         const split = new SplitType(lineText, {
            types: "lines",
         });

         split.lines.forEach((line) => {
            const wrapEl = document.createElement("div");
            wrapEl.classList.add("line-wrapper");
            line.parentNode.appendChild(wrapEl);
            wrapEl.appendChild(line);
         });

         gsap.from(split.lines, {
            // opacity: 0,
            y: "160",
            duration: duration,
            ease: "power3.inOut",
            stagger: stagger,
            scrollTrigger: {
               trigger: lineText,
               start: "top bottom",
               end: "bottom bottom",
               toggleActions: "play none reverse none",
            },
         });
      });

      // Clean up on unmount
      return () => {
         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
   }, [triggerClass, duration, stagger]);

   return <div ref={textRef}>{children}</div>;
};
