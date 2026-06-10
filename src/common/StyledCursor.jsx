import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const StyledCursor = ({ icon, visible }) => {
   const cursorSize = 100;
   const mouse = {
      x: useMotionValue(null),
      y: useMotionValue(null),
   };

   const smoothMouse = {
      x: useSpring(mouse.x, { damping: 100, stiffness: 2000, mass: 0.5 }),
      y: useSpring(mouse.y, { damping: 100, stiffness: 2000, mass: 0.5 }),
   };

   const manageMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
   };

   useEffect(() => {
      if (visible) {
         document.addEventListener("mousemove", manageMouseMove);
      } else {
         document.removeEventListener("mousemove", manageMouseMove);
      }

      return () => {
         document.removeEventListener("mousemove", manageMouseMove);
      };
   }, [visible]);

   if (!visible) return null;

   return (
      <motion.div
         className="w-[20px] h-[20px] fixed top-0 left-0 rounded-full bg-[#111] pointer-events-none flex gap-1 items-center justify-center z-[9999]"
         style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
         }}
         animate={{
            width: cursorSize,
            height: cursorSize,
         }}
      >
         {icon}
      </motion.div>
   );
};
