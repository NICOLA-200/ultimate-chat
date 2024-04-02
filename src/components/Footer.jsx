import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { IoHandLeftOutline } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="relative z-100 space-x-1 bro:space-x-4 pt-10 pb-10 flex font-bold  justify-center">
      <div className="flex items-baseline gap-2 ">
        <IoEarth />
        <p className="w-[50%]">Trusted globally</p>
      </div>

      <div className="flex items-baseline gap-2">
        <FaUserGroup />
        <p className="w-[50%]">8 million users</p>
      </div>

      <div className="flex items-baseline gap-2">
        <IoHandLeftOutline />
        <p className="w-[50%]">Free to use</p>
      </div>
    </div>
  );
}
