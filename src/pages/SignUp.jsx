import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signUp } from "../redux/actions/user.js";
import { Store } from "../redux/store.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/loader/Loading.jsx";
import { BsLayoutSidebar } from "react-icons/bs";
import "../App.css"

export default function SignUp() {
  const initialState = {
    username: "",
    password: "",
    fullname: "",
    slogan: "",
    email: "",
  };

  const statu = useSelector((state) => state.mesStatus);
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const HandlerSubmit = (e) => {
    e.preventDefault();
    console.log("the handleSubmit has executed");
    setLoading(true);
    Store.dispatch(signUp(data));
    setLoading(false);
  };

  return (
    <div className=" flex justify-center items-center w-full h-[100vh] py-20 sm:py-0 bg-zinc-100 relative">
      <div className="flex items-center sm:w-[620px] w-[80%] sm:my-0  bg-white rounded-xl shadow-lg flex-col space-y-4 relative h-auto p-10 justify-center">
        <div className=" absolute h-[50%] w-full top-0 z-0 ">
          <div className="bg-yellowColor h-[80%] w-full"></div>
          <div className="bg-yellowColor h-0 w-0 border-b-[100px] sm:border-l-[620px] border-l-[78.9vw] border-b-white  border-l-transparent"></div>
        </div>

        <p className="font-bold text-xl relative ">SIGN UP</p>
        <form action="" onSubmit={HandlerSubmit} className="text-center">
          <div className="flex flex-wrap justify-center pb-3 items-center gap-9 relative">
            <div className="items-start flex flex-col">
              <label htmlFor="user">user name</label>

              <input
                type="text"
                placeholder="your username"
                onChange={handleChange}
                name="username"
                value={data.username}
                onFocus={() => setBorderColor("yellow")}
                onBlur={() => setBorderColor("gray")}
                required

                className="bg-[#D9D9D9] text-neutral-600 focus:border-yellow-300 fo  p-2 text-lg border-[2px] rounded-md pl-2 "
              />
            </div>

            <div className="items-start flex flex-col">
              <label htmlFor="user">Email</label>

              <input
                type="text"
                placeholder="your email"
                onChange={handleChange}
                name="email"
                value={data.email}
                required
                className="bg-[#D9D9D9] text-neutral-600 p-2 text-lg border-[2px] rounded-md pl-2 "
              />
            </div>

            <div className="items-start flex flex-col">
              <label htmlFor="user">password</label>

              <input
                type="password"
                placeholder="your password"
                onChange={handleChange}
                name="password"
                value={data.password}
                required
                className="bg-[#D9D9D9] text-neutral-600 p-2 text-lg border-[2px]  rounded-md pl-2 "
              />
            </div>

            <div className="items-start flex flex-col">
              <label htmlFor="user">Full name</label>

              <input
                type="text"
                placeholder="full name"
                onChange={handleChange}
                name="fullname"
                value={data.fullname}
                className="bg-[#D9D9D9] text-neutral-600 p-2 text-lg border-[2px]   rounded-md pl-2 "
              />
            </div>

            <div className="items-start flex flex-col">
              <label htmlFor="user">Slogan </label>

              <input
                type="text"
                placeholder="your slogan"
                onChange={handleChange}
                name="slogan"
                value={data.slogan}
                className="bg-[#D9D9D9] p-2 text-neutral-600 text-lg border-[2px] border-yellow rounded-md pl-2 "
              />
            </div>
          </div>
          {statu && (
            <p
              className={
                statu == "username taken" ? "text-red-500" : "text-green-500"
              }
            >
              {statu}
            </p>
          )}
          <input
            type="submit"
            value={"Sign up"}
            disabled={loading}
            className="bg-yellowColor mt-5  text-black p-1 font-bold px-2 text-center rounded-md hover:bg-yellow-400  hover:border-yellow-300 "
          />
        </form>

        <p>
          Have an account{" "}
          <span>
            <Link to={"/login"} className="text-yellow-600 hover:underline">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
