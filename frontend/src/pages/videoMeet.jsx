import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";

const serverUrl = "http://localhost:3000";

const peerConfigConnections = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302"] },
    { urls: ["stun:stun1.l.google.com:19302"] },
  ],
};

export default function VideoMeet() {
  const socketRef = useRef();
  const localVideoRef = useRef();
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");

  const isChrome = () => {
    const userAgent = navigator.userAgent;
    return userAgent.includes("Chrome") && !userAgent.includes("Edg");
  };

  useEffect(() => {
    if (!isChrome()) {
      alert("This works best on Chrome");
    }
    if (!askForUsername) {
      getMedia();
    }
  }, [askForUsername]);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoAvailable,
        audio: audioAvailable,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const handleJoin = () => {
    if (username.trim()) {
      setAskForUsername(false);
    }
  };

  return (
    <div>
      {askForUsername ? (
        <div>
          <h2>Enter into Lobby</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <video ref={localVideoRef} autoPlay muted />
      )}
    </div>
  );
}
