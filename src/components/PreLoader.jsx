import styles from "../animations/style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "../animations/anim.js";

const words = ["/logo-white.svg"];

export const Preloader = () => {
   const [index, setIndex] = useState(0);
   const [dimension, setDimension] = useState({ width: 0, height: 0 });

   useEffect(() => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
   }, []);

   useEffect(() => {
      if (index == words.length - 1) return;
      setTimeout(
         () => {
            setIndex(index + 1);
         },
         index == 0 ? 1200 : 220
      );
   }, [index]);

   const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height
      } Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height
      }  L0 0`;
   const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height
      } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

   const curve = {
      initial: {
         d: initialPath,
         transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      },
      exit: {
         d: targetPath,
         transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
      },
   };

   return (
      <motion.div
         variants={slideUp}
         initial="initial"
         exit="exit"
         className={styles.introduction}
      >
         {dimension.width > 0 && (
            <>
               <motion.div
                  variants={opacity}
                  initial="initial"
                  animate="enter"
                  className="flex flex-col items-center gap-6 z-10"
               >
                  <img
                     src={words[index]}
                     alt="Vaibhav Nagargoje"
                     width={120} // Slightly smaller logo to fit text
                     height={120}
                  />
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                     className="text-white text-lg md:text-2xl font-light tracking-[0.3em] flex items-center gap-3 text-nowrap mt-4"
                  >
                     WELCOME TO MY PORTFOLIO
                     <motion.span
                        animate={{
                           rotate: [0, 20, 0],
                           scale: [1, 1.2, 1]
                        }}
                        transition={{
                           repeat: -1,
                           duration: 1.5,
                           ease: "easeInOut"
                        }}
                        className="inline-block"
                     >
                        ✨
                     </motion.span>
                  </motion.div>
               </motion.div>
               <svg>
                  <motion.path
                     variants={curve}
                     initial="initial"
                     exit="exit"
                  ></motion.path>
               </svg>
            </>
         )}
      </motion.div>
   );
};
