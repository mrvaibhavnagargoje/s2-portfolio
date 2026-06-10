const Footer = () => {
   return (
      <footer className="w-full pt-16 bg-white flex gap-6 items-center justify-center flex-col">
         <div className="w-full sm:w-[90%] flex items-center justify-between flex-col gap-12 md:flex-row">
            <div className="flex gap-2 flex-col flex-1 text-center">
               <b>No &copy; copyright issues.</b>
               <span>Feel free to copy. If you need any help, ping me !</span>
            </div>
            <div className="flex gap-4 flex-col flex-1 items-center">
               <span className="sacramento text-5xl md:text-4xl lg:text-5xl">
                  Vaibhav Nagargoje
               </span>
               <div className="flex gap-2 items-center">
                  <span>Made with</span>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="20"
                     width="20"
                     viewBox="0 0 512 512"
                  >
                     <path
                        fill="#ff0000"
                        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                     />
                  </svg>
                  <span>in India</span>
               </div>
            </div>
            <div className="flex gap-2 sm:gap-4 flex-col flex-1 items-center">
               <span>You can find me everywhere</span>
               <div className="flex gap-6 items-center">
                  <a
                     target="_blank"
                     href="https://github.com/mrvaibhavnagargoje"
                     className=""
                  >
                     <img
                        src="/github.jpg"
                        alt="github.com/mrvaibhavnagargoje"
                        width={38}
                        height={38}
                     />
                  </a>
                  <a
                     target="_blank"
                     href="https://twitter.com/vaibhavnagargoje"
                     className=""
                  >
                     <img
                        src="/x.jpg"
                        alt="twitter.com/vaibhavnagargoje"
                        width={38}
                        height={38}
                     />
                  </a>
                  <a
                     target="_blank"
                     href="https://www.linkedin.com/in/vaibhavnagargoje/"
                     className=""
                  >
                     <img
                        src="/linkedin.svg"
                        alt="linkedin.com/in/vaibhavnagargoje"
                        width={38}
                        height={38}
                     />
                  </a>
                  <a
                     target="_blank"
                     href="https://www.instagram.com/mr.vaibhavnagargoje/"
                     className=""
                  >
                     <img
                        src="/instagram.jpg"
                        alt="instagram.com/mr.vaibhavnagargoje/"
                        width={38}
                        height={38}
                     />
                  </a>
               </div>
            </div>
         </div>
         <div>
            <img
               src="https://akshaysaini.in/img/foot.jpg"
               alt=""
               style={{
                  fill: "blue",
               }}
            />
         </div>
      </footer>
   );
};

export default Footer;
