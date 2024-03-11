"use client";
import React, { useState } from "react";
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

  const handleSendMessage = async (newMessage) => {
    try {
      const userMessage = { text: newMessage, type: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        const botResponse = { text: data.message, type: "bot" };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <head>
        <title>Home</title>
      </head>

      <body>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Paper className="paper">
              <img id="imghome" src={"/images/homefondo.jpg"} />
              <div id="button-container">
                <Button id="button">Perder Peso</Button>
                <Button id="button">Ganar Masa Muscular</Button>
                <Button id="button">Tonificar</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper id="chatPaper" className="paper">
              <ChatMessages messages={messages} />
              <SendMessageForm onSendMessage={handleSendMessage} />
            </Paper>
          </Grid>
        </Grid>
      </body>
    </>
  );
}

function ChatMessages({ messages }) {
  return (
    <>
      <h2 className="h2">Chat</h2>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} className={message.type}>
            {message.text}
          </ListItem>
        ))}
      </List>
    </>
  );
}

function SendMessageForm({ onSendMessage }) {
  const [newMessage, setNewMessage] = useState("");

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

