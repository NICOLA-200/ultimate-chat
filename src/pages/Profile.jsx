import React, { useEffect, useState } from "react";
import MinNavbar from "../components/MinNavbar.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import PeopleCard from "../components/Cards/PeopleCard.jsx";
import ProfileCard from "../components/Cards/ProfileCard.jsx";
import axios from "axios";
import ChatCard from "../components/Cards/ChatCard.jsx";
import VideoPlayer from "../components/videoModal/VideoPlayer.jsx";
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
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const info = await axios.get(`${HTTP}/user/currentUser`, {
        withCredentials: true,
      });

      setData(info.data);

      const users = await axios.get(`${HTTP}/user/`, {
        withCredentials: true,
      });

      setUsers(users.data);

      const notifications = await axios.get(`${HTTP}/message/notification`, {
        withCredentials: true,
      });

      setNotification(notifications.data);
      setNotCount(notifications.data.notNumber.notNumber);
    }

    fetchData();
  }, []);

  const fetchUser = async () => {

    const users = await axios.get(`${HTTP}/user/`, {
      withCredentials: true,
    });

    setUsers(users.data);


  };

  const fetchFriends = async () => {
  
    const users = await axios.get(`${HTTP}/user/Friends`, {
      withCredentials: true,
    });

    setUsers(users.data);
 
  };

  const oneUser = async (id) => {
    const users = await axios.get(`${HTTP}/user/user/${id}`);

    setData(users.data._doc);

    setOne(1);
  };

  const isOne = async (user) => {
    const info = await axios.get(`${HTTP}/user/currentUser`, {
      withCredentials: true,
    });
    setData(info.data);
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
    setNotCount(0);
    await axios.get(`${HTTP}/message/notificationClear`, {
      withCredentials: true,
    });
  };

  const active = (data) => {
    setActiveUsers(data);
  };

  const handleActiveChange = () => {
    const newUsers = users.filter((user) => {
      return activeUsers.some((activeUser) => {
        return user._id == activeUser.userId;
      });
    });
    if (newUsers.length == 0) {
      setLoading(true);
    }

    setUsers(newUsers);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredUsers =
      users &&
      users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
    setSearchUsers(filteredUsers);
  };

  return (
    <div className="">
      <MinNavbar showNotification={showNotification} notCount={notCount} />
      <div className="mt-10 pt-5 pb-4 item-center md:space-x-12 flex justify-around xl:mx-16 px-10 flex-col-reverse md:flex-row">
        <div className="xl:w-[35%] max-h[90vh] overflow-auto pb-4">
          <div className="shadow-md rounded-xl p-4 max-h-[60vh]   overflow-auto ">
            <div className="sticky top-0 bg-white z-50">
              <div className="flex justify-center items-center border border-1  border-neutral-300 rounded-md px-2">
                <input
                  type="text"
                  className=" outline-none focus:transparent p-1 w-[300px] "
                  onChange={handleSearchChange}
                  value={searchTerm}
                  placeholder="Search..."
                />
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
                  onClick={handleActiveChange}
                  className="hover:border-b-2    border-yellow-400 hover:text-yellow"
                >
                  Active
                </button>
              </div>
            </div>

            {searchUsers.length > 0
              ? searchUsers.map((user) => {
                  return (
                    <PeopleCard
                      key={user._id}
                      user={user}
                      oneUser={oneUser}
                      isOne={isOne}
                    />
                  );
                })
              : users.map((user) => {
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
          {loading && users.length < 1 && (
            <p className="text-center">there is no active users</p>
          )}
          {users.length < 1 && (
            <div className="flex gap-6 text-center justify-center mt-5  text-2xl">
              <Loading /> <span>Loading data...</span>{" "}
            </div>
          )}
        </div>

        {one == 1 && <ProfileCard info={data} />}
        {one == 2 && (
          <ChatCard info={data} id={id} isTwo={isTwo} active={active} />
        )}
        {one == 3 && <VideoPlayer showVideo={showVideo} info={data} id={id} />}
        {<Notification notification={notification} showNot={showNot} />}
      </div>
    </div>
  );
}
