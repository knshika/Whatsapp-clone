import { Avatar } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "../stylings/SidebarChat.css";

function SidebarChat({ addNewChat, id, name }) {
  const [picId, setPicId] = useState("");

  const [messages, setMessages] = useState("")

  useEffect(() => {
    if(id){
      db.collection("chatRooms").doc(id).collection("messages").orderBy("timestamp","desc")
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc)=>
        doc.data()
        ))
      ))
    }
  
  }, [id])


  useEffect(() => {
    setPicId(Math.floor(Math.random() * 69));
  }, []);

  const createNewChat = () => {
    const roomName = prompt("Please enter name for Chat");

    if (roomName) {
      db.collection("chatRooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/chatRooms/${id}`}>
      <div className="sidebar_chat" id={id}>
        <Avatar src={`https://i.pravatar.cc/150?img=${picId}`} />
        <div className="chat_info">
          <h3>{name}</h3>
          <p>{
              messages[0]?.message
          }</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createNewChat} className="sidebar_chat">
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat;
