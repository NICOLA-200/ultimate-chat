import React from "react";
import BackGround from "../components/BackGround";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  console.log(isAuthenticated);

  return (
    <div className="px-[2rem]  xl:mx-20">
      <BackGround />
      <Navbar />

      <Body />

      {isAuthenticated && <Footer />}
    </div>
  );
}
