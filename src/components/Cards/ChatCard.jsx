import React from "react";
import man from "../../assets/images/man.png";
import { CgProfile } from "react-icons/cg";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { GrMicrophone } from "react-icons/gr";
import { io } from "socket.io-client";
import { useRef, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../loader/Loading.jsx";
import { BsTelephone } from "react-icons/bs";
import { GrVideo } from "react-icons/gr";
import { HTTP } from "../../server.js";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function ChatCard({ info, id, isTwo }) {
  console.log(id);
  const socket = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [myId, setMyId] = useState(info._id);
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(null);
  const [imageView, setImageView] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seen, setSeen] = useState(true);

  const scroll = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", info._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
  }, [info]);

  useEffect(() => {
    async function getallMessage() {
      setLoading(true);
      const { data } = await axios.get(`${HTTP}/message/${info._id}/${id._id}`);
      console.log(data);
      setLoading(false);
      setReceivedMessage(data);
    }

    getallMessage();
  }, []);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(typeof data.message);
      console.log(data.seen);
      console.log("let us see what  we want ");

      addMessage(data);
      console.log(data.time);
      console.log(receivedMessage);

      console.log("let sadfgfdsadfg ds");

      console.log(info._id);

      if (info._id == data.sendId) {
        console.log("let sadfgfdsadfg ds");
        console.log(seen);
        storeMessage({
          message: data.message,
          receiverId: id._id,
          sendId: info._id,
          time: moment().format("dd h:mm a"),
          seen: data.seen,
        });
      }
    });
  }, []);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessage]);

  const addMessage = (data) => {
    console.log("executed");
    setReceivedMessage((prev) => [...prev, data]);
    console.log(receivedMessage);
  };

  const sendMessage = () => {
    if (message !== null && message == "image selected") {
      setLoading(true);
      sendImage();
      setMessage("");
      setAvatar("");
      setFile(null);
      setImageView(false);
    } else if (message !== null) {
      socket.current.emit("send-message", {
        message,
        receiverId: id._id,
        sendId: info._id,
        time: moment().format("dd h:mm a"),
        seen,
      });
      setShowEmoji(false);
      setMessage("");
    } else {
      return;
    }
  };

  const storeMessage = async (message) => {
    console.log("storage");
    axios
      .post(`${HTTP}/message`, message)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleFileInputChange = (e) => {
    console.log("the image view: " + imageView);
    setImageView(true);
    const reader = new FileReader();
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(file);
    setMessage("image selected");

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
  };

  const sendImage = async () => {
    console.log("this id: " + info._id);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("sendId", info._id);
    formData.append("receiverId", id._id);
    formData.append("message", "");
    formData.append("time", moment().format("dd h:mm a"));
    formData.append("seen", true);
    console.log(formData);
    axios
      .post(`${HTTP}/message`, formData)
      .then((data) => {
        console.log(data);
        setReceivedMessage((prev) => [...prev, data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const cancelImage = () => {
    setMessage("");
    setAvatar();
    setFile(null);
    setImageView(false);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };

  const showVideo = () => {
    isTwo();
  };
  return (
    <>
      <div className="flex-1  flex shadow-xl flex-col rounded-xl space-y-3 items-center overflow-hidden pb-10 mb-2 relative">
        <div className="flex p-3  border border-transparent border-b-black  w-full justify-between items-center ">
          <div className="flex space-x-2">
            <div className="rounded-full  h-[35px] w-[35px] overflow-hidden object-fill">
              <img
                src={id.profilePicture ? id.profilePicture : man}
                alt="man"
                className="w-[35px] h-[35px] "
                width={35}
                height={35}
              />
            </div>
            <p>{id.username}</p>
          </div>

          <div className="flex gap-5  pr-7">
            <BsTelephone title="this feature is not yet done" />
            <button onClick={showVideo}>
              <GrVideo />
            </button>
          </div>
        </div>

        <div className="flex  w-[100%] h-[400px] p-0 overflow-auto">
          {!loading ? (
            <div className="flex gap-7 py-2  flex-col w-[100%] h-[400px] items-center p-0 overflow-auto">
              {receivedMessage.map((message, index) => {
                console.log(index);
                if (message.sendId == myId) {
                  return (
                    <>
                      <div
                        className="flex  self-end w-auto mx-4 max-w-[70%]   rounded-md shadow-neutral-500 shadow-sm  text-start bg-yellow-200"
                        key={index}
                      >
                        <div
                          ref={scroll}
                          className="w-full h-[90%]  shadow-neutral-700 shadow-sm rounded-md rounded-br-2xl p-3"
                        >
                          {message?.message?.includes("cloudinary") ? (
                            <img
                              src={message.message}
                              width={100}
                              height={100}
                            />
                          ) : (
                            <span>{message.message}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-500 text-center  ">
                        {message.time}
                      </p>
                      {console.log(
                        "thsi: " + typeof receivedMessage[index].time
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      <div
                        className="flex  self-start w-auto mx-4 max-w-[70%]  rounded-md  shadow-neutral-500 shadow-sm text-start bg-neutral-200"
                        key={index}
                      >
                        <div
                          ref={scroll}
                          className="w-full h-[90%] shadow-neutral-700 shadow-sm rounded-md rounded-br-2xl p-3"
                        >
                          {message?.message?.includes("cloudinary") ? (
                            <img
                              src={message.message}
                              width={100}
                              height={100}
                            />
                          ) : (
                            <span>{message.message}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-neutral-500 ">{message.time}</p>
                    </>
                  );
                }
              })}
            </div>
          ) : (
            <div className="flex justify-center m-auto absolute right-[50%] -top-[50%] items-center">
              <Loading />
            </div>
          )}
          {/* <div className="flex seft-start w-[300px] mx-4 rounded-2xl p-3 text-start bg-neutral-200">
          hy, this is me the only one and the best left footed play in the world
          of skilles
        </div>

        <div className="flex  self-end w-[300px] mx-4  rounded-2xl p-3 text-start bg-yellow-200">
          hy, this is me the only one and the best left footed play in the world
          of skilles
        </div> */}
        </div>

        <div className="absolute bottom-7  rounded-lg p-1 items-center gap-4 w-[90%]  mx-auto flex  bg-neutral-300 justify-between ">
          <button className="pl-2" onClick={() => setShowEmoji(!showEmoji)}>
            <BsEmojiSmile />
          </button>
          {showEmoji && (
            <div className="absolute -top-[440px] z-50 left-2">
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={28}
                onEmojiSelect={addEmoji}
                maxFrequentRows={0}
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Message"
            className=" outline-none bg-neutral-200 focus:transparent p-1 w-full "
            onChange={changeMessage}
            value={message}
            disabled={imageView}
          />

          <label htmlFor="file-input" className="hover:text-yellow-500">
            <AiOutlinePicture className="hover:text-yellow" />
            <input
              type="file"
              name="avatar"
              id="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </label>

          <button
            className="bg-yellowColor rounded-md border-[2px] hover:bg-yellow-300 text-black p-1 px-4"
            onClick={sendMessage}
          >
            {loading ? (
              <div className="w-[20px] h-[20px] ">
                <Loading />
              </div>
            ) : (
              " Send"
            )}
          </button>
          {imageView && (
            <div className="w-auto h-auto p-1 object-fill bg-neutral-500 opacity-90 absolute -top-[5.5rem]  rounded-md right-2">
              <img src={avatar} alt="avatar" className=" w-[90px] h-[70px]" />
              <button
                className="rounded-full w-10 h-10 bg-red-600 flex justify-center items-center absolute -right-4 -top-4"
                onClick={cancelImage}
              >
                <IoCloseSharp />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
