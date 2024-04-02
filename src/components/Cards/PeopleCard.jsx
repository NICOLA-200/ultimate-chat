import React, { useEffect, useState } from "react";
import man from "../../assets/images/man.png";
import axios from "axios";
import Loading from "../loader/Loading";

export default function PeopleCard({ user, oneUser, isOne }) {
  const [status, setStatus] = useState();
  const [friend, setFreinds] = useState([]);
  const [request, setRequest] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ad, setAd] = useState();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3001/user/currentUser`,
        {
          withCredentials: true,
        }
      );

      console.log(data);
      setFreinds(data.friends);
      setRequest(data.friendsRequest);
      setConfirm(data.friendConfirm);
      setLoading(false);
    }

    fetchUser();
  }, [user, status]);

  console.log(user);
  console.log("one users");

  const id = user._id;

  const AddFriend = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:3001/user/FriendRequest",
      { id },
      { withCredentials: true }
    );
    setLoading(false);
    if (data == "ok") {
      setStatus("FriendRequest");
    }
  };

  const ConfirmFriend = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:3001/user/FriendConfirm",
      { id },
      { withCredentials: true }
    );
    setLoading(false);
    if (data == "ok") {
      setStatus("message");
    }
  };

  const UnRequestFriend = async () => {
    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:3001/user/UnRequestFriend",
      { id },
      { withCredentials: true }
    );
    setLoading(false);
    if (data == "ok") {
      setStatus("add Friend");
    }
  };

  const changeUser = () => {
    oneUser(id);
  };

  const chatPage = () => {
    isOne(user);
  };

  return (
    <div className="flex justify-between shadow-sm mt-2  p-2">
      <div className="flex ">
        <div className="rounded-full h-[35px] w-[35px] overflow-hidden object-fill">
          <img
            src={
              user.profilePicture && user.profilePicture.length > 0
                ? user.profilePicture
                : man // assuming 'man' is a variable or string containing the URL of the default image
            }
            alt="loading..."
            className="relative w-[35px] h-[35px]"
          />
        </div>
        <button onClick={changeUser}>
          <p className="pl-2 hover:underline">{user.username}</p>
        </button>
      </div>

      {friend.includes(id) ? (
        <button
          className="bg-yellowColor border-[2px] p-1 px-1 hover:bg-yellow-400 rounded-md"
          onClick={chatPage}
        >
          {loading ? <Loading /> : "message"}
        </button>
      ) : request.includes(id) ? (
        <button
          className="bg-yellowColor border-[2px] p-1 px-1 hover:bg-yellow-400 rounded-md"
          onClick={UnRequestFriend}
        >
          {loading ? <Loading /> : " Friend Requested"}
        </button>
      ) : confirm.includes(id) ? (
        <button
          className="bg-yellowColor border-[2px] p-1 px-1 hover:bg-yellow-400 rounded-md"
          onClick={ConfirmFriend}
        >
          {loading ? <Loading /> : " confirm Friend"}
        </button>
      ) : (
        <button
          className="bg-yellowColor border-[2px] p-1 px-1 hover:bg-yellow-400 rounded-md"
          onClick={AddFriend}
        >
          {loading ? <Loading /> : "  Add Friend "}
        </button>
      )}
    </div>
  );
}
