import { useEffect, useRef } from "react";
import gsap from "gsap";

let idleTimeout = 150;
const amount = 20;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
let idle = false;

class Dot {
   constructor(index = 0, cursor) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      this.scale = 1 - 0.05 * index;
      this.range = width / 2 - (width / 2) * this.scale + 2;
      this.limit = width * 0.75 * this.scale;
      this.element = document.createElement("span");
      gsap.set(this.element, { scale: this.scale });
      cursor.appendChild(this.element);
   }

   lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
   }

   draw(delta) {
      if (!idle || this.index <= sineDots) {
         gsap.set(this.element, { x: this.x, y: this.y });
      } else {
         this.angleX += this.anglespeed;
         this.angleY += this.anglespeed;
         this.y = this.lockY + Math.sin(this.angleY) * this.range;
         this.x = this.lockX + Math.sin(this.angleX) * this.range;
         gsap.set(this.element, { x: this.x, y: this.y });
      }
   }
}

export const Cursor = () => {
   const cursorRef = useRef(null);
   const mousePosition = useRef({ x: 0, y: 0 });
   const dots = useRef([]);
   const lastFrame = useRef(0);
   const timeoutID = useRef(null);
   const idle = useRef(false);
   const requestRef = useRef(null);

   const buildDots = (cursor, dotsRef) => {
      // Clear existing dots in ref and DOM
      dotsRef.current = [];
      cursor.innerHTML = "";
      for (let i = 0; i < amount; i++) {
         let dot = new Dot(i, cursor);
         dotsRef.current.push(dot);
      }
   };

   const positionCursor = (delta) => {
      let x = mousePosition.current.x;
      let y = mousePosition.current.y;
      dots.current.forEach((dot, index, dts) => {
         let nextDot = dts[index + 1] || dts[0];
         dot.x = x;
         dot.y = y;
         dot.draw(delta);
         if (!idle.current || index <= sineDots) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
         }
      });
   };

   const render = (timestamp) => {
      const delta = timestamp - lastFrame.current;
      positionCursor(delta);
      lastFrame.current = timestamp;
      requestRef.current = requestAnimationFrame(render);
   };

   const goInactive = () => {
      idle.current = true;
      dots.current.forEach((dot) => dot.lock());
   };

   const startIdleTimer = () => {
      timeoutID.current = setTimeout(goInactive, idleTimeout);
      idle.current = false;
   };

   const resetIdleTimer = () => {
      clearTimeout(timeoutID.current);
      startIdleTimer();
   };

   // Initialize the dots and setup event listeners
   useEffect(() => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      buildDots(cursor, dots);

      const onMouseMove = (event) => {
         mousePosition.current.x = event.clientX - width / 2;
         mousePosition.current.y = event.clientY - width / 2;
         resetIdleTimer();
      };

      const onTouchMove = (event) => {
         mousePosition.current.x = event.touches[0].clientX - width / 2;
         mousePosition.current.y = event.touches[0].clientY - width / 2;
         resetIdleTimer();
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);

      // Start the animation loop
      requestRef.current = requestAnimationFrame(render);

      return () => {
         window.removeEventListener("mousemove", onMouseMove);
         window.removeEventListener("touchmove", onTouchMove);
         if (requestRef.current) cancelAnimationFrame(requestRef.current);
         if (timeoutID.current) clearTimeout(timeoutID.current);
      };
   }, []);

   return (
      <>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // width="800"
            height={0}
         >
            <defs>
               <filter id="goo">
                  <feGaussianBlur
                     in="SourceGraphic"
                     stdDeviation="6"
                     result="blur"
                  />
                  <feColorMatrix
                     in="blur"
                     mode="matrix"
                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                     result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
               </filter>
            </defs>
         </svg>

         <div ref={cursorRef} className="Cursor"></div>
      </>
   );
};
