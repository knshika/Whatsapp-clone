import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import "../stylings/Chat.css";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat() {
  const [input, setInput] = useState("");
  const [picId, setPicId] = useState("");

  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}] = useStateValue();


  useEffect(() => {
    if (roomId) {
      db.collection("chatRooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

        db.collection("chatRooms").doc(roomId).collection("messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())))
    }
    // return () => {
    //   cleanup
    // }
  }, [roomId]);

  useEffect(() => {
    setPicId(Math.floor(Math.random() * 69));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('chatRooms').doc(roomId).collection("messages").add({
      message: input,
      name : user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("");
  };

  return (
    <div className="chat_section">
      <div className="chat_bar">
        <Avatar src={`https://i.pravatar.cc/150?img=${picId}`} />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p> Last seen at{" "} {new Date(
            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat_bar_icons">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message,index)=>(
            <div key={index} className={`chat_msg_user ${message.name === user.displayName && "chat_msg_me"}`}>
            <span className="chat_user">{message.name}</span>
           {message.message}
            <span className="chat_user_timespan">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
            </div>
        ))}
       
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form className="search_container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage}>
            <SendIcon />
          </button>
          {/* <IconButton>
            <SendIcon />
          </IconButton> */}
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
