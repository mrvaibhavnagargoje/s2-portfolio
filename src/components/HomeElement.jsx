import { NameElement } from "./NameElement";
import { AboutSection } from "./AboutSection";
import { TechStackSection } from "./TechStackSection";
import { useEffect } from "react";
import { ProjectsTag } from "./ProjectsTag";
import { HeroProjectsSection } from "./HeroProjectsSection";
import "../animations/styles.css";
import { SliceThrough } from "./SliceThrough";
import Footer from "./Footer";

const HomeElement = ({ isLoading }) => {
   const id = "projectsElement";

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add("show");
            }
         });
      });

      const projectsElement = document.querySelectorAll(`#${id}`);
      projectsElement.forEach((el) => observer.observe(el));

      return () => {
         projectsElement.forEach((el) => observer.unobserve(el));
      };
   }, [id]);

   return (
      <div>
         <NameElement isLoading={isLoading} />
         <AboutSection />
         <TechStackSection />
         <ProjectsTag />
         <HeroProjectsSection />
         <SliceThrough />
         <Footer />
      </div>
   );
};

export default HomeElement;
