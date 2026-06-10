import { useIsDesktop } from "../hooks/useIsDesktop";
import { ButtonComponent } from "./ButtonComponent";
import { StackProjects } from "./StackProjects";

export const HeroProjectsSection = () => {
   const isDesktop = useIsDesktop(800);

   return (
      <>
         <StackProjects />
         <div className="mb-40 flex items-center justify-center">
            <ButtonComponent
               href="/projects"
               text="More Projects"
               width={!isDesktop ? 260 : 380}
               height={!isDesktop ? 60 : 78}
            />
         </div>
      </>
   );
};
