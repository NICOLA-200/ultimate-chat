import React from "react";
import MinNavbar from "../components/MinNavbar.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PeopleCard from "../components/Cards/PeopleCard.jsx";


export default function Profile() {
  return (
    <div className="">
      <MinNavbar />
      <div className="mt-10 pt-5 space-x-12 flex justify-around px-10">
        <div className="">
          <div className="shadow-md rounded-md p-4 ">
            <div className="flex justify-center items-center border border-1 border-neutral-300 rounded-md px-2">
              <input
                type="text"
                className=" outline-none focus:transparent p-1 w-[300px] "
                onChange={() => {}}
                placeholder="Search..."
              />
              <button onClick={() => {}}>
                <IoSearchOutline />
              </button>
            </div>
            <div className="flex justify-around mb-5 mt-3 ">
              <Link to={"/"}>People</Link>

              <Link to={"/"}>Friends</Link>

              <Link to={"/"}>Active</Link>
            </div>

            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
            <PeopleCard />
          </div>
        </div>

        
      </div>
    </div>
  );
}
