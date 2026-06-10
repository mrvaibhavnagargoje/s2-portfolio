import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomeElement from "./components/HomeElement";
import ProjectsElement from "./components/ProjectsElement";
import { Appbar } from "./components/Appbar";
import { Cursor } from "./components/Cursor";
import { useIsDesktop } from "./hooks/useIsDesktop";
import { AnimatePresence } from "framer-motion";
import transition from "./animations/transition";
import { Preloader } from "./components/PreLoader";
import PageTitle from "./components/PageTitle";
import { MenuOverlay } from "./components/MenuOverlay";

const TransitionedProjectsElement = transition(ProjectsElement);

function App() {
   const location = useLocation();
   const appbarRef = useRef(null);
   const projectsRef = useRef(null);
   const isDesktop = useIsDesktop(800);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      location.pathname === "/" &&
         setTimeout(() => {
            window.scrollTo(0, 0);
            setIsLoading(false);
         }, 1680);

      return () => {};
   }, [location.pathname]);

   console.log(
      import.meta.env.VITE_MODE === "DEVELOPMENT"
         ? import.meta.env.VITE_DEVELOPMENT_URL
         : import.meta.env.VITE_PRODUCTION_URL
   );

   return (
      <>
         {isDesktop && <Cursor />}
         <Appbar ref={appbarRef} />
         <MenuOverlay />

         <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               <Route
                  path="/"
                  element={
                     <>
                        <AnimatePresence mode="wait">
                           {isLoading && <Preloader />}
                        </AnimatePresence>
                        <PageTitle title="Vaibhav Nagargoje" />
                        <HomeElement isLoading={isLoading} />
                     </>
                  }
               />
               <Route
                  path="/projects"
                  element={
                     <>
                        <PageTitle title="Projects | Vaibhav Nagargoje" />
                        <TransitionedProjectsElement
                           id="projectsElement"
                           projectsRef={projectsRef}
                        />
                     </>
                  }
               />
            </Routes>
         </AnimatePresence>
      </>
   );
}

export default App;
