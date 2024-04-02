import React, { useEffect } from "react";
import man from "../../assets/images/man.png";
import { RxAvatar } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { HTTP } from "../../server";

export default function ProfileCard(props) {
  const initialData = {
    username: "",
    password: "",
    fullname: "",
    slogan: "",
    email: "",
  };
  console.log(props.info);

  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState(props.info);

  // setData(props.info);

  console.log("this is thed data in the  profile card: " + data);
  console.log("slogna:" + props?.info.friendsNumber);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(file);

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
  };

  const sendImage = async () => {
    console.log("this id: " + props.info._id);
    const formData = new FormData();
    formData.append("avatar", file);
    console.log(formData);
    axios
      .put(`${HTTP}/user/${props.info._id}`, formData)
      .then((dat) => {
        console.log("th is the data: " + JSON.stringify(dat.profilePicture));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex-1 justify-center items-center flex shadow-xl flex-col rounded-md space-y-10 overflow-hidden pb-10 z-0  mb-2">
      <div className="w-full h-[150px] relative bg-yellowColor justify-center items-end flex mb-14">
        <div className="relative">
          <div className="rounded-full  h-[150px] w-[150px] -bottom-14 mb-4 relative md:-bottom-24 overflow-hidden object-fill">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <img
                src={
                  props.info &&
                  props.info.profilePicture &&
                  props.info.profilePicture.length > 0
                    ? props.info.profilePicture
                    : man // assuming 'man' is a variable or string containing the URL of the default image
                }
                alt="loading..."
                className="relative w-[150px] h-[150px]"
              />
            )}
          </div>
          <label
            htmlFor="file-input"
            className="ml-5 flex z-50 absolute bottom-1 hover:text-yellow-500  -right-2 items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaCamera className="hover:text-yellow" />
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <button
        onClick={sendImage}
        className="bg-black rounded-md hover:bg-neutral-600 w-[100px] flex-auto   text-white p-1"
      >
        Upload
      </button>

      <form
        action=""
        className="flex  px-10 flex-wrap gap-7  md:gap-x-14 md:gap-y-6 justify-center pb-3 relative "
      >
        <div className="items-start flex flex-col">
          <label htmlFor="user">user name</label>

          <input
            type="text"
            placeholder="your username"
            onChange={handleChange}
            value={props.info.username}
            className="bg-[#D9D9D9] p-1 rounded-md pl-2 w-[220px]"
            disabled
          />
        </div>

        <div className="items-start flex flex-col">
          <label htmlFor="user">Email</label>

          <input
            type="text"
            placeholder="your email"
            onChange={handleChange}
            value={props.info.email}
            name="email"
            className="bg-[#D9D9D9] p-1 rounded-md pl-2 w-[220px]"
            disabled
          />
        </div>

        <div className="items-start flex flex-col">
          <label htmlFor="user">Full name</label>

          <input
            type="text"
            placeholder="full name"
            onChange={handleChange}
            value={props.info?.fullname}
            className="bg-[#D9D9D9] p-1 rounded-md pl-2 w-[220px]"
            disabled
          />
        </div>

        <div className="items-start flex flex-col">
          <label htmlFor="user">Slogan </label>

          <input
            type="text"
            placeholder="your slogan"
            onChange={handleChange}
            value={props.info?.slogan}
            className="bg-[#D9D9D9] p-1 rounded-md pl-2 w-[220px]"
            disabled
          />
        </div>
      </form>

      <div className="flex flex-around justify-around items-center w-full">
        <p> friends</p>
      </div>
    </div>
  );
}
