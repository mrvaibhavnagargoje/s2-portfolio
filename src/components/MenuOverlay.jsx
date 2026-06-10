import { useEffect, useState } from "react";

export const MenuOverlay = () => {
   const [showMenuOverlay, setShowMenuOverlay] = useState(false);

   const handleShowOverlayModal = () => {
      setShowMenuOverlay(!showMenuOverlay);
   };

   function handleContact() {
      setShowMenuOverlay(false);
      // intensional delay
      setTimeout(() => {
         const main = document.getElementById("main");
         main.scrollIntoView({
            behavior: "smooth",
         });
      }, 400);
   }

   useEffect(() => {
      const menuText = document.getElementsByClassName("menuText");

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add("menuTextShow");
            } else {
               entry.target.classList.remove("menuTextShow");
            }
         });
      });

      if (menuText) {
         for (let i = 0; i < menuText.length; i++) {
            observer.observe(menuText[i]);
         }
      }

      return () => {
         if (menuText) {
            for (let i = 0; i < menuText.length; i++) {
               observer.unobserve(menuText[i]);
            }
         }
      };
   }, []);

   return (
      <>
         <div
            className={`border-r-4 border-[#111] fixed top-0 left-0 ${
               showMenuOverlay ? "z-30" : "z-0"
            } w-[120dvw] h-screen flex items-center bg-[#f1f1f1] px-2 lg:px-10 duration-[600ms] ${
               showMenuOverlay ? "translate-x-0" : "translate-x-[-100%]"
            }`}
         >
            <div className="w-[80%] xs:w-full h-full lg:h-[80%] rotate-[270deg] xs:rotate-[0deg] text-[60px] md:text-[60px] lg:text-[100px] font-[1000] flex flex-col gap-6 lg:gap-2 items-start justify-center lg:justify-evenly uppercase leading-tight">
               <a
                  href="/"
                  data-fill-text="Home"
                  className="menuText custom-cursor pl-[6px] lg:pl-[20px]"
               >
                  Home
               </a>
               <a
                  href="/projects"
                  data-fill-text="Projects"
                  className="menuText custom-cursor pl-[6px] lg:pl-[20px]"
               >
                  Projects
               </a>
               <span
                  onClick={handleContact}
                  data-fill-text="Contact"
                  className="menuText custom-cursor pl-[6px] lg:pl-[20px]"
               >
                  Contact
               </span>
               <a
                  href="https://drive.google.com/file/d/10g0POtsHqPH68Z9uq0PqNxOgL82IbtOk/view?usp=sharing"
                  target="_blank"
                  data-fill-text="Resume"
                  className="menuText custom-cursor pl-[6px] lg:pl-[20px]"
               >
                  Resume
               </a>
            </div>
         </div>
         <div
            className={`w-full fixed top-[90%] lg:top-6 z-30 duration-[800ms] ${
               showMenuOverlay
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[600%] lg:translate-y-[-400%]"
            }`}
         >
            <div className="px-6 flex gap-6 items-center justify-center lg:justify-end">
               <a
                  target="_blank"
                  href="https://github.com/mrvaibhavnagargoje"
                  className="custom-cursor"
               >
                  <img
                     src="/github.jpg"
                     alt="github.com/mrvaibhavnagargoje"
                     width={28}
                     height={28}
                  />
               </a>
               <a
                  target="_blank"
                  href="https://twitter.com/vaibhavnagargoje"
                  className="custom-cursor"
               >
                  <img
                     src="/x.jpg"
                     alt="twitter.com/vaibhavnagargoje"
                     width={28}
                     height={28}
                  />
               </a>
               <a
                  target="_blank"
                  href="https://www.linkedin.com/in/vaibhavnagargoje/"
                  className="custom-cursor"
               >
                  <img
                     src="/linkedin.svg"
                     alt="linkedin.com/in/vaibhavnagargoje"
                     width={28}
                     height={28}
                  />
               </a>
               <a
                  target="_blank"
                  href="https://www.instagram.com/mr.vaibhavnagargoje/"
                  className="custom-cursor"
               >
                  <img
                     src="/instagram.jpg"
                     alt="instagram.com/mr.vaibhavnagargoje"
                     width={28}
                     height={28}
                  />
               </a>
            </div>
         </div>
         <div
            onClick={handleShowOverlayModal}
            className={`menu-btn-3 w-[48px] h-[30px] fixed top-6 lg:top-1/2 right-10 ${
               showMenuOverlay ? "active" : ""
            } z-30 custom-cursor cursor-pointer`}
         >
            <span></span>
         </div>
      </>
   );
};
