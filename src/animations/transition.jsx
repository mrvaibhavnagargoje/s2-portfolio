import { motion } from "framer-motion";

function transition(OgComponent) {
   return function TransitionedComponent(props) {
      return (
         <>
            <OgComponent {...props} />
            <motion.div
               className="fixed top-0 left-0 w-full h-screen bg-[#111] origin-bottom"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 0 }}
               exit={{ scaleY: 1 }}
               transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
               className="fixed top-0 left-0 w-full h-screen bg-[#111] origin-top"
               initial={{ scaleY: 1 }}
               animate={{ scaleY: 0 }}
               exit={{ scaleY: 0 }}
               transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
         </>
      );
   };
}

export default transition;
