import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuth } from "../redux/actions/user.js";
import { Store } from "../redux/store.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/loader/Loading.jsx";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const data = useLocation();
  const status1 = useSelector((state) => state.status1);
  const [loading, setLoading] = useState(false);
  console.log(data);

  const submitHandler = () => {
    setLoading(true);
    Store.dispatch(getUserAuth(username, password));
    setLoading(false);
    console.log("data submitted");
  };

  return (
    <div className=" flex justify-center items-center w-full h-[100vh] py-20 sm:py-0 bg-zinc-100 relative">
      <div className="flex items-center w-[420px] sm:my-0  bg-white shadow-lg rounded-xl flex-col space-y-4 relative h-auto p-10 justify-center">
        <div className=" absolute h-[50%] w-full top-0 z-0 ">
          <div className="bg-yellow-300 h-[80%] w-full"></div>
          <div className="bg-yellow-300 h-0 w-0 border-b-[100px] border-l-[420px]  border-b-white  border-l-transparent"></div>
        </div>

        <p className="font-bold text-xl relative">LOGIN</p>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col justify-center pb-3 gap-14 relative"
        >
          <div className="items-start flex flex-col">
            <label htmlFor="user">user name</label>

            <input
              type="text"
              placeholder="your username"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              className="bg-[#D9D9D9] p-2 text-lg text-neutral-600 rounded-md pl-2 "
            />
          </div>

          <div className="items-start flex flex-col">
            <label htmlFor="user">password</label>

            <input
              type="password"
              placeholder="your password"
              onChange={(e) => setPassword(e.target.value)}
              name="pass"
              value={password}
              className="bg-[#D9D9D9] p-2 text-lg text-neutral-600 rounded-md pl-2 "
            />
          </div>
        </form>

        {status1 && <p className="text-red-500">{status1}</p>}

        <button
          className="bg-yellowColor  text-black p-1 font-bold px-5 rounded-md hover:bg-yellow-400  hover:border-yellow-300 "
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? <Loading /> : "Login"}
        </button>
        <p>
          Create new account{"   "}
          <span>
            <Link to={"/signup"} className="text-yellow-600 hover:underline ">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
