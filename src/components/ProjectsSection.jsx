import { motion } from "framer-motion";
import { forwardRef, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { StyledCursor } from "../common/StyledCursor";
import { Link } from "lucide-react";

export const ProjectsSection = forwardRef(function ProjectsSection(
   { projects, id },
   ref
) {
   const [cursorVisible, setCursorVisible] = useState(false);
   const isDesktop = useIsDesktop(800);

   const container = useRef(null);

   const handleMouseEnter = () => {
      setCursorVisible(true);
   };

   const handleMouseLeave = () => {
      setCursorVisible(false);
   };

   return (
      <motion.div ref={container}>
         <div
            className="mt-0 md:mt-0 py-0 md:py-0 flex gap-28 md:gap-0 flex-col"
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            {projects.map((project, idx) => {
               return (
                  <ProjectCard
                     key={project.title}
                     projectData={project}
                     serial={idx + 1}
                     isInverted={idx % 2}
                     id={id}
                  />
               );
            })}
         </div>
         {isDesktop && (
            <StyledCursor
               icon={
                  <Link
                     color="#f1f1f1"
                     width={20}
                     height={20}
                     strokeWidth={1}
                  />
               }
               visible={cursorVisible}
            />
         )}
      </motion.div>
   );
});
