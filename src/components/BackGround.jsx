import React from "react";

export default function BackGround() {
  return (
    <div className="fixed h-full w-[35%] md:w-[35%] dif:w-[40%]  bg-yellowColor right-0 top-0">
      <div className="relative  w-[50%]  left-[-50%] h-[22%]    bg-yellowColor  ms:w-[50%]"></div>
      <div class="w-0 h-0 border-r-[23vw] dif:border-r-[25.2vw] sm:border-r-[26vw]  relative left-[-50%]  border-r-yellowColor border-b-[75px]  border-b-transparent"></div>

      <div class="w-0 h-0 border-l-[23vw] dif:border-l-[25.2vw] sm:border-l-[26vw]  relative left-[-50%]  bottom-[-30%] border-l-transparent border-b-[75px]  border-b-yellowColor"></div>
      <div className="relative  w-[50%]  bottom-[-30%] left-[-50%] h-[33%] bg-yellowColor  ms:w-[50%]"></div>
    </div>
  );
}
