import { useEffect, useState } from "react";

export const useIsDesktop = (breakpoint = 600) => {
   const [isDesktop, setIsDesktop] = useState(
      document.body.clientWidth > breakpoint
   );

   useEffect(() => {
      setIsDesktop(document.body.clientWidth > breakpoint);
   }, [document.body.clientWidth]);

   return isDesktop;
};



// import { useEffect, useState } from "react";

// export const useIsDesktop = (breakpoint = 600) => {
//    const [isDesktop, setIsDesktop] = useState(
//       window.innerWidth > breakpoint
//    );

//    useEffect(() => {
//       const handleResize = () => {
//          setIsDesktop(window.innerWidth > breakpoint);
//       };

//       window.addEventListener("resize", handleResize);
//       // Initial check
//       handleResize();

//       return () => window.removeEventListener("resize", handleResize);
//    }, [breakpoint]);

//    return isDesktop;
// };
