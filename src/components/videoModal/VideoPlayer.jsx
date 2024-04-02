import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { io } from "socket.io-client";
import { IoCall } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import Peer from "simple-peer";
import SimplePeer from "simple-peer";



function VideoPlayer({ info, id, showVideo }) {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callingUser, setCallingUser] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  console.log(info)
  console.log(id)
  console.log("this is it ")
  const socket = io("http://localhost:8800");

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
          console.log("media query happened");
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });

        socket.emit("new-user" , info._id+1)

      socket.on("me", (id) => {
        console.log("me me me ");
        console.log(id);
        setMe(id);
      });



      socket.on("callUser", ({ from, signal }) => {
        setCall({ isReceivingCall: true, from, signal });
        console.log("someone is calling!?");
      });

      socket.on("callEnded", () => {
        cancelVideo();
      });
    } else {
      console.error("getUserMedia is not supported in this browser.");
    }
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: true, stream });

    peer.on("signal", (data) => {
      console.log(call);
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = () => {
    setCallingUser(true);
    const peer = new Peer({ initiator: true, trickle: true, stream });

    peer.on("signal", (data) => {
      console.log("this one executed");
      socket.emit("callUser", {
        userToCall: id._id+1,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    console.log("see the sream");
    console.log(userVideo);
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      setCallingUser(false);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const cancelVideo = () => {
    showVideo();
    setCallingUser(false);
    setCallEnded(true);
    socket.emit("ended");
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div className="flex-1 flex shadow-xl flex-col pt-5 rounded-xl space-y-3 items-center overflow-hidden pb-10  mb-2 relative">
      <video
        className="border-[2px] w-[630px] h-[55vh]  shadow-md shadow-slate-800"
        ref={userVideo}
        autoPlay
        playsInline
        muted
      ></video>

      <button
        className="rounded-full z-50 w-8 h-8 bg-red-600 flex justify-center items-center absolute xl:right-20 right-4 bottom-1"
        onClick={cancelVideo}
      >
        <IoCloseSharp title="cancel video" />
      </button>
      <div className="z-50 flex gap-2   justify-center items-center absolute  right-[47%] bottom-12">
        {call.isReceivingCall && (
          <button
            className="rounded-full z-50 w-8 h-8 bg-green-600 flex justify-center items-center "
            onClick={answerCall}
          >
            <IoCall />
          </button>
        )}

        {!callingUser && (
          <button
            className="rounded-full z-50 w-8 h-8 bg-green-600 flex justify-center items-center "
            onClick={callUser}
          >
            <IoCall title="call" />
          </button>
        )}

        {callAccepted ||
          (callingUser && (
            <button
              className="rounded-full z-50 w-8 h-8 bg-red-600 flex justify-center items-center"
              title="leave call"
              onClick={cancelVideo}
            >
              <IoCall />
            </button>
          ))}
        <p className="">
          {callingUser && "calling..."} {callAccepted && "call accepted"}
        </p>
      </div>
      <video
        className="absolute w-[20%] min-w-[110px] min-h-[110px] h-[25%] bottom-12 right-[3%]  border-[2px] sxl:right-[7%] xl:right-[12%]  shadow-md shadow-slate-800"
        ref={myVideo}
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
}

export default VideoPlayer;
