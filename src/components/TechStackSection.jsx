import { useEffect } from "react";
import { useIsDesktop } from "../hooks/useIsDesktop";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeUp } from "./FadeUp";

gsap.registerPlugin(ScrollTrigger);

export const TechStackSection = () => {
   const isDesktop = useIsDesktop(600);

   useEffect(() => {
      // Change background of body on skillsSection enter
      gsap.fromTo(
         "body",
         {
            background: "#f1f1f1",
         },
         {
            background: "black",
            scrollTrigger: {
               trigger: ".skillsSection",
               start: "-5% center",
               end: "15% center",
               scrub: true,
            },
         }
      );

      // Change background of body on skillsSection leave
      gsap.fromTo(
         "body",
         {},
         {
            background: "#f1f1f1",
            scrollTrigger: {
               trigger: ".skillsSection",
               start: "115% center",
               end: "135% center",
               scrub: true,
            },
         }
      );

      document.getElementById("skillcards").onmousemove = (e) => {
         for (const card of document.getElementsByClassName("skillcard")) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
         }
      };

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add("tech-show");
            } else {
               entry.target.classList.remove("tech-show");
            }
         });
      });

      const techElement = document.querySelectorAll(`#techElement`);
      techElement.forEach((el) => observer.observe(el));

      return () => {
         techElement.forEach((el) => observer.unobserve(el));
      };
   }, []);

   return (
      <div className="skillsSection h-fit my-20 lg:my-40 grid place-content-center gap-6 lg:gap-10 px-2 lg:px-20 py-20">
         <FadeUp>
            <h1 className="fade-up text-center text-[#f1f1f1] text-6xl md:text-7xl lg:text-7xl font-black drop-shadow-2xl mb-12 md:mb-28">
               Skills
            </h1>
         </FadeUp>
         <div id="skillcards">
            {techStack.map((stack) => (
               <div
                  id={`techElement`}
                  key={stack.title}
                  className="skillcard w-[120px] h-[70px] md:w-[240px] lg:w-[320px] xl:w-[360px] md:h-[100px] lg:h-[120px] tech-hidden"
               // className="skillcard w-[100px] h-[60px] md:w-[200px] lg:w-[260px] xl:w-[300px] md:h-[80px] lg:h-[100px] tech-hidden"
               >
                  <div className="skillcard-border"></div>
                  <div className="skillcard-content flex items-center justify-center gap-2 md:gap-3">
                     <h1 className="text-[12px] md:text-lg lg:text-2xl font-bold text-[#f1f1f1]">
                        {stack.title}
                     </h1>
                     <img
                        src={stack.img}
                        alt={stack.title}
                        width={!isDesktop ? 25 : 50}
                        height={!isDesktop ? 25 : 50}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const techStack = [
   {
      title: "HTML",
      img: "/html.jpg",
   },
   {
      title: "CSS",
      img: "/css.jpg",
   },
   {
      title: "TailwindCSS",
      img: "/tailwind.svg",
   },
   {
      title: "JavaScript",
      img: "/javascript.jpg",
   },
   {
      title: "TypeScript",
      img: "/typescript.svg",
   },
   {
      title: "Java",
      img: "/java.svg",
   },
   {
      title: "React",
      img: "/react.svg",
   },
   // {
   //    title: "Next",
   //    img: "/next.jpg",
   // },
   // {
   //    title: "Prisma",
   //    img: "/prisma.svg",
   // },
   // {
   //    title: "PostgreSQL",
   //    img: "/postgresql.jpg",
   // },
   // {
   //    title: "Redux",
   //    img: "/redux.svg",
   // },
   {
      title: "MongoDB",
      img: "/mongodb.svg",
   },
   {
      title: "NodeJs",
      img: "/nodejs.svg",
   },
   {
      title: "ExpressJs",
      img: "/expressjs.svg",
   },
   // {
   //    title: "Tanstack Query",
   //    img: "/tanstack.svg",
   // },
];
