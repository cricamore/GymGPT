"use client";
import React, { useEffect } from "react";
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
  const [responses, setResponses] = useState([]);
  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };
  const handleResponse = (newResponse) => {
    setResponses([...responses, newResponse]);
  }
  

  console.log("Respuestaa, ", responses)
  
  return (
    <>
      <head>
        <title>Home</title>
      </head>

      <body>
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
              
              <ChatMessages messages={messages} responses={responses} />
              <SendMessageForm onSendMessage={handleSendMessage} onSendResponse={handleResponse}/>
            </Paper>
          </Grid>
        </Grid>
      </body>
    </>
  );
}

function ChatMessages({ messages, responses }) {
  console.log("alooo, ", responses)
  return (
    <>
      <h2 className="h2">Chat</h2>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>{message}</ListItem>
        ))}
        {responses.map((response, index) => (
          <ListItem key={index}>{response}</ListItem>
        ))}
      </List>
    </>
  );
}

function SendMessageForm({ onSendMessage, onSendResponse }) {
  const [newMessage, setNewMessage] = React.useState("");
  const [responses, setResponses] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    onSendMessage(newMessage);
    onSendResponse(responses);
    sendMessage(newMessage);
    setNewMessage("");
  };

  async function sendMessage(message) {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      })

      const data = await response.json();

      if (response.ok) {
        const newResponses = data.message;
        setResponses(newResponses);
        console.log("Respuesta: ", newResponses)
      }else{
        throw new Error(data.message)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
        <form
          onSubmit={handleSendMessage}
          style={{ display: "fle!x", flexDirection: "column", height: "100%" }}
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

