import React from "react";
import Logo from "../assets/images/chatLogo.png";
import TopBackground from "../components/TopBackground.jsx";
import Image from "react";
import { GoHome } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";

export default function Profile({ notCount, showNotification }) {
  console.log(notCount);
  console.log("how many notification");

  const notificationShow = () => {
    showNotification();
  };

  return (
    <div className="relative">
      <TopBackground />
      <div className="px-10">
        <div className="flex justify-between relative py-3">
          <div className="mt-5 flex flex-1">
            <div className="flex-1">
              <img
                src={Logo}
                alt="logo"
                width={150}
                height={"auto"}
                className=""
              />
            </div>

            <div className="flex flex-1 justify-around ">
              <Link to={"/"} className="flex items-center hover:text-white justify-center">
                <GoHome
                  width={100}
                  className="font-bold w-[30px] h-[30px]"
                  height={70}
                />
                <span className="hidden sm:block">Home</span>
              </Link>

              <button
                className="flex items-center justify-center hover:text-white relative"
                onClick={notificationShow}
              >
                {notCount > 0 && (
                  <span className="absolute w-[20px] rounded-full text-white h-[20px] left-3 text-center -top-1 bg-red-600 ">
                    {notCount}
                  </span>
                )}
                <IoMdNotificationsOutline className="font-bold w-[30px] h-[30px]" />
                <span className="hidden sm:block">Notification</span>
              </button>

              {/* <div className="flex items-center justify-center">
              <CgProfile />
              <Link to={"/"}>
                <span>Profile</span>
              </Link>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
