'use client';
import { AppBar, Button, Container, Paper, TextField, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import "./login.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  const { auth } = useAuth();
  //const user = auth.currentUser;


  useEffect(() => {
    if (auth) {
      router.push("/home");
    }
    else {
      router.push("/home");
    }
  }, []);
  return (
    <>
      <head>
        <title>GymGPT</title>
      </head>
    </>
  )
}
