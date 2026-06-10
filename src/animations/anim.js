export const opacity = {
   initial: {
      opacity: 0,
   },
   enter: {
      opacity: 0.75,
      transition: { duration: 1, delay: 0.2 },
   },
};

export const slideUp = {
   initial: {
      top: 0,
   },
   exit: {
      top: "-100dvh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
   },
};

export const slideUp2 = {
   initial: {
      y: "100%",
   },
   open: (i) => ({
      y: "0%",
      transition: { duration: 0.5, delay: 0.01 * i },
   }),
   closed: {
      y: "100%",
      transition: { duration: 0.5 },
   },
};
