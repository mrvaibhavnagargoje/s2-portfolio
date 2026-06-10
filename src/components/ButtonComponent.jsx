export const ButtonComponent = ({ href = "/", text = "", width, height }) => {
   return (
      <a
         href={href}
         style={{
            width: width,
            height: height,
         }}
         className="px-0 xs:px-4 group flex gap-2 items-center justify-center text-xl bg-[#1f1f1f] text-slate-950 font-[880] drop-shadow-md rounded-full custom-cursor"
      >
         <div className="w-10 h-10 rounded-full bg-[#f1f1f1] transition-all duration-[0.6s] group-hover:w-full group-hover:h-full absolute left-[10%] group-hover:left-0 group-hover:border group-hover:drop-shadow-xl" />
         <div
            className={`text-[14px] md:text-[16px] lg:text-[21px] pl-6 transition-all duration-[0.4s] group-hover:pl-0 text-[#f1f1f1] group-hover:text-[#1f1f1f] uppercase text-nowrap drop-shadow-md group-hover:drop-shadow-sm`}
         >
            {text}
         </div>
      </a>
   );
};
