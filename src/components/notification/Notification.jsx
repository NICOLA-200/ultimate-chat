import React from "react";
import { useRef, useEffect } from "react";

export default function Notification({ notification, showNot }) {
  console.log("here is the notification");
  console.log(notification);

  console.log(notification?.confirm);
  const scroll = useRef();

  // Check if notification or notification.mess or notification.confirm is undefined
  if (!notification || !notification.mess || !notification.confirm) {
    return null; // Return null or any other fallback UI if notification data is not available
  }

  if (showNot)
    return (
      <div
        className="w-[300px] absolute right-3 top-16 h-auto pl-5 p-2 overflow-auto max-h-[50vh] shadow-xl bg-white z-50 rounded-2xl py-3 "
        style={{}}
      >
        {/* Render notification.mess */}
        {notification.mess.map((user, index) => (
          <div
            ref={scroll}
            key={index}
            className="p-3  border-b border-neutral-300 "
          >
            {user.username}
            <span className="text-black font-bold"> messaged you</span>
            <span className=" text-neutral-600 text-[10px] flex flex-end">
              {user.time}
            </span>
          </div>
        ))}

        {/* Render notification.confirm */}
        {notification.confirm.map((user, index) => (
          <div ref={scroll} key={index}>
            {user.username}{" "}
            <span className="text-black font-bold"> requested for friend</span>
          </div>
        ))}
      </div>
    );
}
