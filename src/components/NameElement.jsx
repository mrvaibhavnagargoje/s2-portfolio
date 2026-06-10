import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const NameElement = ({ isLoading }) => {
   const containerRef = useRef(null);
   const photoRef = useRef(null);
   const nameRef = useRef(null);
   const tagTextRef = useRef(null);

   useEffect(() => {
      // Create GSAP context
      const ctx = gsap.context(() => {
         // Initial hide
         gsap.set([".char", photoRef.current, tagTextRef.current], {
            opacity: 0,
            y: 50
         });

         // Intro animations
         if (!isLoading) {
            gsap.to(".char", {
               opacity: 1,
               y: 0,
               duration: 1,
               stagger: 0.05,
               ease: "back.out(1.7)",
               delay: 0.2
            });

            gsap.to(photoRef.current, {
               opacity: 1,
               x: 0,
               y: 0,
               duration: 0.8,
               ease: "power2.out",
               delay: 0.1
            });

            gsap.to(tagTextRef.current, {
               opacity: 1,
               y: 0,
               duration: 1,
               ease: "power2.out",
               delay: 0.4
            });
         }

         // Mouse Tilt Effect
         const handleMouseMove = (e) => {
            if (isLoading) return;
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(nameRef.current, {
               rotateY: xPos,
               rotateX: -yPos,
               duration: 0.5,
               ease: "power2.out",
               transformPerspective: 1000
            });
         };

         window.addEventListener("mousemove", handleMouseMove);

         // Floating animation for photo borders
         gsap.to(".photo-border", {
            rotate: "+=8",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
         });

         // Subtle floating for the whole photo
         gsap.to(photoRef.current, {
            y: "-=15",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
         });

         return () => window.removeEventListener("mousemove", handleMouseMove);
      }, containerRef);

      return () => ctx.revert();
   }, [isLoading]);

   const handleCharHover = (e) => {
      gsap.to(e.target, {
         y: -20,
         scale: 1.2,
         color: "#475569", // Slate-600
         duration: 0.3,
         ease: "power2.out"
      });
   };

   const handleCharLeave = (e) => {
      gsap.to(e.target, {
         y: 0,
         scale: 1,
         color: "#0E100F",
         duration: 0.3,
         ease: "power2.in"
      });
   };

   const splitName = (name) => {
      return name.split("").map((char, index) => (
         <span
            key={index}
            className="char inline-block cursor-pointer transition-colors duration-300"
            onMouseEnter={handleCharHover}
            onMouseLeave={handleCharLeave}
         >
            {char === " " ? "\u00A0" : char}
         </span>
      ));
   };

   return (
      <div
         ref={containerRef}
         className="header w-full min-h-[100vh] flex flex-col md:flex-row items-center justify-center relative px-8 md:px-24 lg:px-32 xl:px-48 overflow-hidden pt-20 md:pt-0"
      >
         {/* Background Elements */}
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-200/50 rounded-full blur-[100px] -z-10" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-100/40 rounded-full blur-[120px] -z-10" />

         {/* Text Section */}
         <div className="flex-1 z-10 text-center md:text-left select-none">
            <h1
               ref={nameRef}
               className="text-[12vw] md:text-[8vw] lg:text-[7.5vw] font-black uppercase leading-[0.85] text-[#0E100F] tracking-tighter will-change-transform"
               style={{ transformStyle: "preserve-3d" }}
            >
               <div className="overflow-visible py-2 whitespace-nowrap">
                  {splitName("Vaibhav")}
               </div>
               <div className="overflow-visible py-2 whitespace-nowrap">
                  {splitName("Nagargoje")}
               </div>
            </h1>

            <div
               ref={tagTextRef}
               className="mt-10 flex gap-4 items-center justify-center md:justify-start text-[14px] md:text-[18px] uppercase font-medium tracking-widest text-slate-600 opacity-80"
            >
               <ArrowDownRight className="w-6 h-6 animate-bounce" strokeWidth={1.5} />
               <p>
                  Frontend Developer <br className="hidden md:block" />
                  based in India
               </p>
            </div>
         </div>

         {/* Photo Section */}
         <div className="flex-1 flex items-center justify-center mt-12 md:mt-0 relative">
            <div
               ref={photoRef}
               className="relative w-72 h-72 md:w-[450px] md:h-[450px] grayscale hover:grayscale-0 transition-all duration-700"
            >
               <div className="photo-border absolute inset-0 border-2 border-slate-900 rounded-2xl rotate-3 -z-10" />
               <div className="photo-border absolute inset-0 border-2 border-slate-300 rounded-2xl -rotate-3 -z-10" />
               <img
                  src="/me2.jpeg"
                  alt="Vaibhav Nagargoje"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                     e.target.src = "https://via.placeholder.com/450x450?text=Vaibhav";
                  }}
               />
            </div>
         </div>

         {/* <div className="flex items-center justify-center z-10 w-full px-4 lg:w-auto mt-8 lg:mt-0">
            <GsapMagnetic>
               <div
                  ref={photoRef}
                  className="relative group w-full max-w-[340px] aspect-square md:max-w-[440px] lg:max-w-[480px] xl:max-w-[540px] transition-transform duration-700"
               >
                  <img
                     src="/me.jpeg"
                     alt="Vaibhav Nagargoje"
                     className="w-full h-full object-cover rounded-[3rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 border-8 border-white"
                     onError={(e) => {
                        e.target.src = "https://via.placeholder.com/540x540?text=Vaibhav";
                     }}
                  />
               </div>
            </GsapMagnetic>
         </div> */}

         {/* Scroll Indicator */}
         <div className="hidden lg:block absolute bottom-12 left-12 xl:left-20 select-none">
            <div className="go-down-btn relative w-24 h-24 lg:w-28 lg:h-28 transform transition-transform hover:scale-110">
               <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="textPath" fill="none" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  <text className="text-[9.7px] font-bold fill-slate-800/40 animate-spin-slow origin-center">
                     <textPath xlinkHref="#textPath">
                        SCROLL TO DISCOVER • SCROLL TO DISCOVER •&nbsp;
                     </textPath>
                  </text>
                  <circle cx="50" cy="50" r="1.7" className="fill-slate-800" />
               </svg>
            </div>
         </div>
      </div>
   );
};







// Main code

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowDownRight } from "lucide-react";
// import { useEffect } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export const NameElement = () => {
//    useEffect(() => {
//       const tagText = document.getElementById("tagText");

//       const observer = new IntersectionObserver((entries) => {
//          entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                entry.target.classList.add("name-show");
//             } else {
//                entry.target.classList.remove("name-show");
//             }
//          });
//       });

//       setTimeout(() => {
//          if (tagText) {
//             observer.observe(tagText);
//          }
//       }, 400);

//       return () => {
//          if (tagText) {
//             observer.unobserve(tagText);
//          }
//       };
//    }, []);

//    return (
//       <div className="header w-[100dvw] h-[70dvh] sm:h-[100dvh] md:mt-12 flex flex-col items-center justify-center pointer-events-none select-none relative">
//          <div
//             id="nameText"
//             className="absolute translate-x-[0%] -translate-y-[50%] letters text-[#0E100F] flex flex-row items-center justify-center text-[40px] sm:text-[60px] md:text-[88px] lg:text-[120px] xl:text-[180px] leading-[0.78] scale-y-[3.2] xs:scale-y-[4.2] sm:scale-y-[4.2] xl:scale-y-[3.2] xl:scale-x-[0.72] uppercase font-[880] drop-shadow-lg animated-bg"
//          >
//             <div className="wave"></div>
//             <div className="wave"></div>
//             <div className="text-nowrap">Vaibhav Nagargoje</div>
//          </div>
//          <div className="h-[26%] sm:h-[32%] md:h-[44%] lg:h-[52%] xl:h-[60%]" />
//          <div
//             id="tagText"
//             className="name-hidden w-[36%] xs:w-[40%] lg:w-[50%] xl:w-[40%] h-fit flex gap-6 items-center justify-end top-[62%] right-[16%] xs:top-[62%] xs:right-[16%] md:top-[62%] md:right-[14%] lg:top-[74%] lg:right-[20%] xl:top-[84%] xl:right-[20%] 2xl:top-[86.2%] 2xl:right-[16%] text-[12px] font-[360] 2xl:font-[400] scale-y-[1.28] scale-x-[1.4] md:scale-y-[1.6] md:scale-x-[1.62] 2xl:scale-x-[1.8] uppercase text-nowrap"
//          >
//             <span className="lg:scale-125">
//                <ArrowDownRight strokeWidth={1.6} />
//             </span>
//             <h1>
//                Frontend Developer <br />
//                based in India
//             </h1>
//          </div>
//          <div className="absolute bottom-[2%] md:bottom-[10%] left-[4%] md:left-[2%]">
//             <div
//                className="go-down-btn relative inline-block"
//                title="Scroll down"
//             >
//                <svg
//                   version="1.1"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="relative block"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   x="0px"
//                   y="0px"
//                   width="100px"
//                   height="100px"
//                   viewBox="0 0 100 100"
//                   enableBackground="new 0 0 100 100"
//                   xmlSpace="preserve"
//                >
//                   <circle fill="#232426" cx="50" cy="50" r="4" />
//                   <path
//                      id="textPath"
//                      fill="none"
//                      d="M89.322,50.197c0,22.09-17.91,40-40,40c-22.089,0-40-17.91-40-40 c0-22.089,17.911-40,40-40C71.412,10.197,89.322,28.108,89.322,50.197z"
//                   />
//                   <text className="text-[10px] origin-center">
//                      <textPath xlinkHref="#textPath">
//                         <tspan x="10">SCROLL TO DISCOVER</tspan>
//                         <tspan x="122">•</tspan>
//                         <tspan x="134">SCROLL TO DISCOVER</tspan>
//                         <tspan x="248">•</tspan>
//                      </textPath>
//                   </text>
//                </svg>
//             </div>
//          </div>
//       </div>
//    );
// };





//Animated text

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowDownRight } from "lucide-react";
// import { useEffect, useState, useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export const NameElement = () => {
//    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//    const textRef = useRef(null);
//    const canvasRef = useRef(null);

//    useEffect(() => {
//       // Sparkle Canvas Setup
//       const canvas = canvasRef.current;
//       const ctx = canvas?.getContext("2d");
//       let particles = [];
//       const colors = ["#ffffff", "#60a5fa", "#a78bfa", "#38bdf8"];
//       let animationFrameId;

//       if (canvas && ctx) {
//          canvas.width = window.innerWidth;
//          canvas.height = window.innerHeight;

//          const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             for (let i = 0; i < particles.length; i++) {
//                particles[i].x += particles[i].speedX;
//                particles[i].y += particles[i].speedY;
//                if (particles[i].size > 0.1) particles[i].size -= 0.05;
//                particles[i].life--;
               
//                ctx.fillStyle = particles[i].color;
//                ctx.beginPath();
//                ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
//                ctx.fill();

//                if (particles[i].life <= 0 || particles[i].size <= 0.1) {
//                   particles.splice(i, 1);
//                   i--;
//                }
//             }
//             animationFrameId = requestAnimationFrame(animate);
//          };
//          animate();
//       }

//       const handleMouseMove = (e) => {
//          setMousePos({ x: e.clientX, y: e.clientY });

//          // Add sparkles
//          if (ctx) {
//             for (let i = 0; i < 3; i++) {
//                particles.push({
//                   x: e.clientX,
//                   y: e.clientY,
//                   size: Math.random() * 5 + 1,
//                   speedX: Math.random() * 2 - 1,
//                   speedY: Math.random() * 2 - 1,
//                   color: colors[Math.floor(Math.random() * colors.length)],
//                   life: 100
//                });
//             }
//          }

//          // Text 3D Tilt
//          if (textRef.current) {
//             const x = (window.innerWidth / 2 - e.clientX) / 30;
//             const y = (window.innerHeight / 2 - e.clientY) / 30;
//             gsap.to(textRef.current, {
//                rotateY: -x,
//                rotateX: y,
//                duration: 0.8,
//                ease: "power2.out",
//                transformPerspective: 1000
//             });
//          }
//       };

//       const handleResize = () => {
//          if (canvas) {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//          }
//       };

//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("resize", handleResize);

//       const tagText = document.getElementById("tagText");

//       const observer = new IntersectionObserver((entries) => {
//          entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                entry.target.classList.add("name-show");
//             } else {
//                entry.target.classList.remove("name-show");
//             }
//          });
//       });

//       setTimeout(() => {
//          if (tagText) {
//             observer.observe(tagText);
//          }
//       }, 400);

//       return () => {
//          if (tagText) {
//             observer.unobserve(tagText);
//          }
//          cancelAnimationFrame(animationFrameId);
//          window.removeEventListener("mousemove", handleMouseMove);
//          window.removeEventListener("resize", handleResize);
//       };
//    }, []);

//    return (
//       <div className="header w-[100dvw] h-[70dvh] sm:h-[100dvh] md:mt-12 flex flex-col items-center justify-center pointer-events-none select-none relative overflow-hidden">
//          {/* Sparkle Canvas Effect */}
//          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 mix-blend-screen" />

//          {/* Glowing interactive orb */}
//          <div 
//             className="absolute top-0 left-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/20 blur-[100px] md:blur-[140px] pointer-events-none -z-10 transition-transform duration-700 ease-out" 
//             style={{ transform: `translate(${mousePos.x - window.innerWidth/4}px, ${mousePos.y - window.innerHeight/4}px)` }}
//          />
//          <div
//             ref={textRef}
//             id="nameText"
//             className="absolute translate-x-[0%] -translate-y-[50%] letters text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 flex flex-row items-center justify-center text-[40px] sm:text-[60px] md:text-[88px] lg:text-[120px] xl:text-[180px] leading-[0.78] scale-y-[3.2] xs:scale-y-[4.2] sm:scale-y-[4.2] xl:scale-y-[3.2] xl:scale-x-[0.72] uppercase font-[880] drop-shadow-lg animated-bg will-change-transform"
//          >
//             <div className="wave"></div>
//             <div className="wave"></div>
//             <div className="text-nowrap">Vaibhav Nagargoje</div>
//          </div>
//          <div className="h-[26%] sm:h-[32%] md:h-[44%] lg:h-[52%] xl:h-[60%]" />
//          <div
//             id="tagText"
//             className="name-hidden w-[36%] xs:w-[40%] lg:w-[50%] xl:w-[40%] h-fit flex gap-6 items-center justify-end top-[62%] right-[16%] xs:top-[62%] xs:right-[16%] md:top-[62%] md:right-[14%] lg:top-[74%] lg:right-[20%] xl:top-[84%] xl:right-[20%] 2xl:top-[86.2%] 2xl:right-[16%] text-[12px] font-[360] 2xl:font-[400] scale-y-[1.28] scale-x-[1.4] md:scale-y-[1.6] md:scale-x-[1.62] 2xl:scale-x-[1.8] uppercase text-nowrap"
//          >
//             <span className="lg:scale-125">
//                <ArrowDownRight strokeWidth={1.6} />
//             </span>
//             <h1>
//                Frontend Developer <br />
//                based in India
//             </h1>
//          </div>
//          <div className="absolute bottom-[2%] md:bottom-[10%] left-[4%] md:left-[2%]">
//             <div
//                className="go-down-btn relative inline-block"
//                title="Scroll down"
//             >
//                <svg
//                   version="1.1"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="relative block"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   x="0px"
//                   y="0px"
//                   width="100px"
//                   height="100px"
//                   viewBox="0 0 100 100"
//                   enableBackground="new 0 0 100 100"
//                   xmlSpace="preserve"
//                >
//                   <circle fill="#232426" cx="50" cy="50" r="4" />
//                   <path
//                      id="textPath"
//                      fill="none"
//                      d="M89.322,50.197c0,22.09-17.91,40-40,40c-22.089,0-40-17.91-40-40 c0-22.089,17.911-40,40-40C71.412,10.197,89.322,28.108,89.322,50.197z"
//                   />
//                   <text className="text-[10px] origin-center">
//                      <textPath xlinkHref="#textPath">
//                         <tspan x="10">SCROLL TO DISCOVER</tspan>
//                         <tspan x="122">•</tspan>
//                         <tspan x="134">SCROLL TO DISCOVER</tspan>
//                         <tspan x="248">•</tspan>
//                      </textPath>
//                   </text>
//                </svg>
//             </div>
//          </div>
//       </div>
//    );
// };
