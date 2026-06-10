import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProjectsTag = ({ invert }) => {
   const container = useRef();
   const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"],
   });

   return (
      <div
         ref={container}
         className="projectsTag h-[20vh] sm:h-[32vh] flex items-center justify-center overflow-x-hidden"
      >
         <Slider progress={scrollYProgress} invert={invert} />
      </div>
   );
};

const Slider = ({ progress, invert }) => {
   let dif = invert ? -1 : 1;
   const x = useTransform(progress, [0, 1], [-2500 * dif, 2500 * dif]);

   return (
      <motion.div className="flex gap-10" style={{ x }}>
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
         <Tag />
      </motion.div>
   );
};

const Tag = () => {
   return (
      <h1 className="hollowText text-[80px] md:text-[100px] lg:text-[120px] text-transparent drop-shadow-md font-[1000]">
         Projects
      </h1>
   );
};
