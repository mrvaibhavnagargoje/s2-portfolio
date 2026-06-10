import { forwardRef, useRef } from "react";
import { GsapMagnetic } from "./GSAPMagnetic";
import logo from "/logo.svg";

export const Appbar = forwardRef(function Appbar(_props, ref) {
   const appbarRef = useRef(null);

   function handleContact() {
      const main = document.getElementById("main");
      main.scrollIntoView({
         behavior: "smooth",
      });
   }

   return (
      <nav
         className="appbar text-[#0E100F] flex items-center font-['Mulish'] justify-end p-4 sm:p-6 absolute top-0 left-0 w-[100dvw] transition-colors duration-300 z-50"
         ref={appbarRef}
      >
         <div className="fixed top-4 left-4 text-lg py-3 px-4 sm:px-6 font-[600] rounded-full flex z-50">
            <a href="/" className="custom-cursor uppercase custom-cursor">
               <img
                  src={logo}
                  alt="Vaibhav Nagargoje"
                  width={40}
                  height={40}
                  className="hover:fill-white"
               />
            </a>
         </div>

         <div
            className="hidden lg:flex items-center justify-between sm:w-1/3 md:w-fit"
            ref={ref}
         >
            <GsapMagnetic>
               <div
                  className={`text-lg font-[600] py-3 px-6 rounded-full hover:text-[#000]`}
               >
                  <a
                     href="/projects"
                     className="custom-cursor uppercase custom-cursor"
                  >
                     Projects
                  </a>
               </div>
            </GsapMagnetic>
            <GsapMagnetic>
               <div className="text-[14px] md:text-[16px] lg:text-lg font-[600] py-3 px-6 rounded-full hover:text-[#000]">
                  <div
                     onClick={handleContact}
                     className="uppercase custom-cursor cursor-pointer"
                  >
                     Contact
                  </div>
               </div>
            </GsapMagnetic>
            <GsapMagnetic>
               <div className="text-[14px] md:text-[16px] lg:text-lg font-[600] py-3 px-6 rounded-full hover:text-[#000]">
                  <a
                     href="https://drive.google.com/file/d/10g0POtsHqPH68Z9uq0PqNxOgL82IbtOk/view?usp=sharing"
                     target="_blank"
                     className="custom-cursor uppercase"
                  >
                     Resume
                  </a>
               </div>
            </GsapMagnetic>
         </div>
      </nav>
   );
});
