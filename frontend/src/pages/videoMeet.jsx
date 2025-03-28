import React, { useState } from 'react'


const server_url= "http://localhost:3000";

var connections = {};

const peerConfigConnections={
    iceServers: [
        { urls: ["stun:stun.l.google.com:19302"] },
        { urls: ["stun:stun1.l.google.com:19302"] },
    ],
}

export default function videoMeet() {

    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef= useRef();
    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video,setVideo] = useState();
    let [audio,setAudio] = useState();
    let [screenShare,setScreenShare] = useState();
    let [showModal,setShowModal] = useState();
    let [screenAvailable,setScreenAvailable] = useState();
    let [messages,setMessages]=useState([]);
    let [message,setMessage] = useState("");
    let [newMessages,setNewMessages] = useState(0);
    let [askForUsername,setAskForUsername] = useState(true);
    let [username,setUsername] = useState("");
    const videoRef = useRef([]);
    let [videos,setVideos] = useState([]);

    if(isChrome()===false){
        alert("This works best on chrome");
    }
  return (
    <div>
     { askForUsername === true?
                <div>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <button onClick={()=>setAskForUsername(false)}>Submit</button>
                </div>:<></>
        }
    </div>
  )
}
