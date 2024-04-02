import React from "react";
import chating from "../assets/images/chating.png";
// import  { Store }  from "../redux/store.js"
// import { getUserAuth } from '../redux/actions/user.js'

export default function () {
  return (
    <div className="relative  flex bro:flex-row flex-col space-y-10  justify-between  bro:text-left  items-center  gap-10  pt-24 pb-14 mx-10">
      <div className="space-y-6 flex-1 pt-10">
        <p className="font-bold text-4xl bro:text-left">
          Chat with your Friends Without Interruption.
        </p>
        <p className="bro:text-left sm:w-[60%]">
          This is a chat app where you can send anything you what such as image,
          file and video .
        </p>
        <button className="bg-[#FFF766] p-2 px-3 rounded-md font-bold  border-neutral-950 border-[2px] hover:bg-yellow-300 hover:text-neutral-800">
          Get started
        </button>
      </div>

      <div className="bro:pr-[12%] justify-center  items-center">
        <img
          src={chating}
          alt=""
          width={300}
          height={300}
          className="border-[0.5rem] md:flex-1 rounded-[50%] min-w-[180px] min-h-[180px]  z-10 border-black"
        />
      </div>
    </div>
  );
}
