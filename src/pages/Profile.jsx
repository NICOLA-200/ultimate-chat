import React, { useEffect, useState } from "react";
import MinNavbar from "../components/MinNavbar.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PeopleCard from "../components/Cards/PeopleCard.jsx";
import ProfileCard from "../components/Cards/ProfileCard.jsx";
import axios from "axios";
import ChatCard from "../components/Cards/ChatCard.jsx";
import VideoPlayer from "../components/videoModal/VideoPlayer.jsx"
import Notification from "../components/notification/Notification.jsx";
import Loading from "../components/loader/Loading.jsx";
import { HTTP } from "../server.js";

export default function Profile() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [id, setId] = useState();
  const [one, setOne] = useState(1);
  const [video, setVideo] = useState(false);
  const [notification, setNotification] = useState({});
  const [showNot, setShowNot] = useState(false);
  const [notCount, setNotCount] = useState();
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const info = await axios.get(`${ HTTP }/user/currentUser`, {
        withCredentials: true,
      });
      console.log("this is the info: ");
      console.log(info.data);

      setData(info.data);
      console.log(data);

      const users = await axios.get(`${ HTTP }/user/`, {
        withCredentials: true,
      });
      console.log(users.data);
      setUsers(users.data);
      console.log("all users");
      
      const notifications = await axios.get(`${ HTTP }/message/notification`, {
        withCredentials: true,
      });
      console.log(notifications);
      setNotification(notifications.data);
      setNotCount(
        notifications.data.notNumber.notNumber
      );
    }

    fetchData();
  }, []);

  const fetchUser = async () => {
    setLoading(true)
    const users = await axios.get(`${ HTTP }/user/`, {
      withCredentials: true,
    });
    console.log(users.data);
    setUsers(users.data);
    setLoading(false)
    console.log("all users");
    console.log(data);
  };

  const fetchFriends = async () => {
    setLoading(true)
    const users = await axios.get(`${ HTTP }/user/Friends`, {
      withCredentials: true,
    });
    console.log(users.data);
    setUsers(users.data);
    setLoading(false)
    console.log("all users");
  };

  const oneUser = async (id) => {
    
    const users = await axios.get(`${HTTP}/user/user/${id}`);
    console.log(users.data);
    setData(users.data);
    console.log("all users");
    setOne(1);
  };

  const isOne = (user) => {
    setOne(2);
    setId(user);
  };

  const isTwo = () => {
    setOne(3);
  };

  const showVideo = () => {
    setOne(2);
  };

  const showNotification = async () => {
    setShowNot((prev) => !prev);
    
    await axios.get(`${ HTTP }/message/notificationClear`, {
        withCredentials: true,
      });
      setShowNot(0)
  };

  return (
    <div className="">
      <MinNavbar showNotification={showNotification} notCount={notCount} />
      <div className="mt-10 pt-5 item-center md:space-x-12 flex justify-around xl:mx-16 px-10 flex-col-reverse md:flex-row">
        <div className="xl:w-[35%] max-h[90vh] overflow-auto">
          <div className="shadow-md rounded-xl p-4  ">
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
              <button
                onClick={fetchUser}
                className=" hover:border-b-2 border-yellow-400 hover:text-yellow"
              >
                People
              </button>

              <button
                onClick={fetchFriends}
                className="hover:border-b-2 border-yellow-400 hover:text-yellow"
              >
                Friends
              </button>

              <button
                onClick={() => {}}
                className="hover:border-b-2    border-yellow-400 hover:text-yellow"
              >
                Active
              </button>
            </div>
       
            {loading ? <Loading /> : users.map((user) => {
              return (
                <PeopleCard
                  key={user._id}
                  user={user}
                  oneUser={oneUser}
                  isOne={isOne}
                />
              );
            })}
          </div>
        </div>

        {one == 1 && <ProfileCard info={data} />}
        {one == 2 && <ChatCard info={data} id={id} isTwo={isTwo} />}
        {one == 3 && <VideoPlayer showVideo={showVideo} info={data} id={id} />}
        {<Notification notification={notification} showNot={showNot} />}
      </div>
    </div>
  );
}
