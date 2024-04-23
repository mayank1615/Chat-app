import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import './App.css'

const socket = io.connect("http://localhost:3001");
const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const[showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h1>Join Chat Room</h1>
      <input
        type="text"
        placeholder="UserName..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input type="text" placeholder="Room Id..." onChange={(event) => {
          setRoom(event.target.value);
        }}/>
      <button onClick={joinRoom}>Join A Room</button>
       </div>
      )
      :
      (<Chat socket = {socket} username = {username} room = {room}/>
      )}
     

    </div>
  );
};

export default App;
