"use client";
import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";

import "./page.css";
export default function Home() {
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      <head>
        <title>Home</title>
      </head>

      <Grid container>
        <Grid item xs={12} sm={8}>
          <Paper id="paper">
            <img id="imghome" src={"/images/homefondo.jpg"} />
            <div id="button-container">
              <Button id="button">Perder Peso</Button>
              <Button id="button">Ganar Masa Muscular</Button>
              <Button id="button">Tonificar</Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper id="paper">
            <ChatMessages messages={messages} />
            <SendMessageForm onSendMessage={handleSendMessage} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
function ChatMessages({ messages }) {
  return (
    <>
      <h2 className="h2">Chat</h2>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>{message}</ListItem>
        ))}
      </List>
    </>
  );
}
function SendMessageForm({ onSendMessage }) {
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <>
     
        <form
          onSubmit={handleSendMessage}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
           <div id="input-container">
          <TextField
            id="outlined-basic"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Escribe un mensaje"
          />
          <Button
            id="button1"
            type="submit"
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
          </div>
        </form>
        
      
    </>
  );
}
