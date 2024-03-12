"use client";
import React, { useState, useRef } from "react";
import { Grid, Paper, List, ListItem, TextField, Button } from "@mui/material";

import "./page.css";

export default function Home() {
  const [messages, setMessages] = useState([ {text: 'Soy un entrenador virtual experto en rutinas fitness, para entrenar todos los grupos musculares, también puedo crear planes de entrenamiento según los propósitos principales que son perder peso, ganar masa muscular, tonificar', type: "bot" }]);
  const handleSendMessage = async (newMessage) => {
    try {
      const userMessage = { text: newMessage, type: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error:", error);
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
                <Button
                  id="button"
                  onClick={() => handleSendMessage("Rutina para perder peso")}
                >
                  Perder Peso
                </Button>
                <Button
                  id="button"
                  onClick={() =>
                    handleSendMessage("Rutina para ganar masa muscular")
                  }
                >
                  Ganar Masa Muscular
                </Button>
                <Button
                  id="button"
                  onClick={() => handleSendMessage("Rutina para tonificar")}
                >
                  Tonificar
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper id="chatPaper" className="paper">
              <h2 className="h2">Chat</h2>
              <div id = "boxMessage"  >
                <ChatMessages messages={messages} />
                
              </div>
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
      <List>
        {messages.map((message, index) => (
          <ListItem id="message" key={index} className={message.type}>
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
