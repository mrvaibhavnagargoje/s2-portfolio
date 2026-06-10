import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { projects as stack } from "../common/projects";

export const StackProjects = () => {
   const container = useRef();

   useLayoutEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(
            ".card:not(:first-child)",
            {
               y: 1000,
            },
            {
               y: 0,
               stagger: 0.5,
               scrollTrigger: {
                  pin: container.current,
                  scrub: 0.5,
               },
            }
         );
      });
      return () => ctx.revert();
   }, []);

   return (
      <div
         ref={container}
         className="stackProjects h-screen lg:my-40 flex items-center justify-center"
      >
         <div className="relative w-[90vw] lg:w-[80vw] h-[68vh] md:h-[60vh] lg:h-[80vh]">
            {stack.slice(0, 4).map((sta) => (
               <a
                  href={sta.link}
                  target="_blank"
                  key={sta.title}
                  className="card absolute top-0 left-0 h-full w-full group custom-cursor"
               >
                  <img
                     className="w-full h-full rounded-lg object-cover"
                     src={sta.heroImg}
                     alt={sta.title}
                  />
                  <div className="fadeBottomCustom h-full relative bottom-[100%] right-0 rounded-lg transition-all duration-300" />
                  <div className="absolute top-0 lg:top-[26%] left-0 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-center lg:justify-between h-full w-full px-10">
                     <p className="animated-bg-white text-[40px] xs:text-[50px] sm:text-[90px] md:text-[100px] lg:text-[108px] text-[#f1f1f1] font-[1000] text-nowrap">
                        {sta.title}
                     </p>
                     <div className="flex items-center justify-center gap-6 flex-row lg:flex-row">
                        {sta.tech.map((t) => (
                           <img src={t} width={34} height={34} key={t} />
                        ))}
                     </div>
                  </div>
               </a>
            ))}
         </div>
      </div>
   );
};
