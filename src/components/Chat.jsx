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

function Chat() {
  const [input, setInput] = useState("");
  const [picId, setPicId] = useState("");

  const { roomId } = useParams();

  useEffect(() => {
    setPicId(Math.floor(Math.random() * 69));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="chat_section">
      <div className="chat_bar">
        <Avatar src={`https://i.pravatar.cc/150?img=${picId}`} />
        <div className="chat_header_info">
          <h3>UserName</h3>
          <p> Last seen at ..</p>
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
        <div className={`chat_msg_user ${false && "chat_msg_me"}`}>
          <span className="chat_user">Knshika</span>
          hey guys
          <span className="chat_user_timespan">3.52pm</span>
        </div>
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
