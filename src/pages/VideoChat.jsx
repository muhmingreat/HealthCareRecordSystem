// VideoChat.jsx
import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // your backend signaling server

const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const [joined, setJoined] = useState(false);

  const ICE_SERVERS = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Free public STUN server
    ],
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    return pc;
  };

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    peerConnection.current = createPeerConnection();

    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit("offer", offer);
  };

  useEffect(() => {
    socket.on("offer", async (offer) => {
      if (!peerConnection.current) {
        peerConnection.current = createPeerConnection();
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await peerConnection.current.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding received ICE candidate", err);
      }
    });
  }, []);

  return (
    <div className="p-4 relative top-20 ">
      <h1 className="text-xl font-bold mb-4">Interactive Video Chat</h1>
      <div className="flex space-x-4">
        <div className="flex justify-center items-center">
        <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg shadow" />
        <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg shadow" />
      </div>
      </div>
      <button
        onClick={() => {
          startCall();
          setJoined(true);
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {joined ? "Connected" : "Start Call"}
      </button>
    </div>
  );
};

export default VideoChat;
