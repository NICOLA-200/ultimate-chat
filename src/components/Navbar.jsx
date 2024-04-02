import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/chatLogo.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Store } from "../redux/store.js";

export default function Navbar() {
  const [toggle, Settoggle] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();
  function toggleDrop() {
    Settoggle((prev) => !prev);
  }

  function LogOut() {
    console.log("something");
    Cookies.remove("access_token");
    navigate("/");
    Store.dispatch({
      type: "userLogin",
      payload: false,
    });
    Store.dispatch({
      type: "status",
      payload: null,
    });
    Store.dispatch({
      type: "status1",
      payload: null,
    });
  }

  return (
    <nav className="relative flex justify-between p-5 items-center z-20">
      <div className="flex-1">
        <img src={Logo} alt="logo" width={150} height={"auto"} />
      </div>

      <div className="hidden respo:flex  flex-1 justify-between items-center">
        {isAuthenticated && (
          <span className="hover:text-yellowColor">
            {" "}
            <Link className="pl-3 hover:text-white" to={"/Profile"}>
              Profile
            </Link>{" "}
          </span>
        )}

        <span className="hover:text-yellowColor">
          {" "}
          <Link className="pl-3 hover:text-white" to={"/"}>
            Home
          </Link>{" "}
        </span>
        <span className="hover:text-yellowColor">
          {" "}
          <Link className="pl-3 hover:text-white" to={"#"}>
            Support
          </Link>{" "}
        </span>
        <span className="hover:text-yellowColor">
          {" "}
          <Link className="pl-3 hover:text-white line-clamp-1" to={"#"}>
            About As
          </Link>{" "}
        </span>
        {isAuthenticated ? (
          <button
            className="p-2 px-4 bg-black text-white border font-semibold  hover:text-black hover:bg-white hover:border-yellow-400 rounded-xl text-center"
            onClick={LogOut}
          >
            LogOut
          </button>
        ) : (
          <button className="p-2 px-4 bg-black text-white border font-semibold  hover:text-black hover:bg-white hover:border-yellow-400 rounded-xl text-center">
            <Link className="font-bold " to={"/signup"}>
              sign in
            </Link>
          </button>
        )}
      </div>

      <div className="respo:hidden flex flex-end relative">
        <button onClick={toggleDrop} className="">
          <HiMenuAlt2 className="text-2xl" />
        </button>

        {toggle && (
          <div className="absolute bg-white shadow-slate-600 shadow-md rounded-md p-4 top-8 z-300 space-y-6 w-[150px] right-[10%] flex flex-col">
            <span className="hover:text-yellowColor">
              {" "}
              <Link className="pl-3 hover:text-yellow" to={"/"}>
                Home
              </Link>
            </span>
            {isAuthenticated && (
              <span className="hover:text-yellowColor">
                {" "}
                <Link className="pl-3 hover:text-white" to={"/Profile"}>
                  Profile
                </Link>{" "}
              </span>
            )}
            <span className="hover:text-yellowColor">
              {" "}
              <Link className="pl-3 hover:text-yellow" to={"/"}>
                Support
              </Link>
            </span>
            <span className="hover:text-yellowColor">
              {" "}
              <Link className="pl-3 hover:text-yellow" to={"/"}>
                About As
              </Link>
            </span>

            {isAuthenticated ? (
              <button
                className="p-2 px-4 bg-black text-white border font-semibold  hover:text-black hover:bg-white hover:border-yellow-400 rounded-xl text-center"
                onClick={LogOut}
              >
                LogOut
              </button>
            ) : (
              <button className="p-2 px-4 bg-black text-white border font-semibold  hover:text-black hover:bg-white hover:border-yellow-400 rounded-xl text-center">
                <Link className="font-bold " to={"/signup"}>
                  sign in
                </Link>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
