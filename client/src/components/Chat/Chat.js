import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { Grid, TextField } from "@material-ui/core";
import "./Chat.css";

const socket = io();

const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserName = currentUser.first_name;
  const [state, setState] = useState({
    message: "",
    name: currentUserName, //currentUserName - not working when its logout.
  });
  const [chat, setChat] = useState([]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <p>
          {name}: <span>{message}</span>
        </p>
      </div>
    ));
  };

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  return (
    <div className="container Chat shadow">
      <Grid container className="Chatboard" spacing={2}>
        <Grid
          item
          xs={12}
          className="render-chat"
          style={{
            justifyContent: "left",
            alignItems: "left",
            display: "flex",
            fontSize: "12px",
          }}
        >
          <div
            className="ChatRoom"
            style={{
              border: "1px solid crimson",
              width: "100%",
              color: "black",
            }}
          >
            <h3>Chatting is: LIVE...</h3>
            {renderChat()}
          </div>
        </Grid>
        <Grid item xs={12}>
          <form className="margin" onSubmit={onMessageSubmit}>
            <Grid item xs={3}>
              <TextField
                name="name"
                onChange={(e) => onTextChange(e)}
                value={state.name}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                name="message"
                onChange={(e) => onTextChange(e)}
                value={state.message}
                placeholder="Type a Message"
              />
            </Grid>
            <Grid item xs={12}>
              <button color="action"> Send</button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
