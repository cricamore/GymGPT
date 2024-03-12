'use client';
import React from 'react'
import { AppBar, Button, Container, Paper, TextField, Toolbar } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import "./page.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function Register() {
  const router = useRouter();

  const { signup } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(email, password);
      if (response) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    setPassword("");
  }



  return (
    <>
      <head>
        <title>Register</title>
      </head>

      <body>
        <div>
          {/* <AppBar className='colors' position='fixed'>
            <Toolbar>
              <Image
                src={"/images/GymGPT.png"}
                width={71}
                height={71}
              />
            </Toolbar>
          </AppBar> */}
        </div>
        <div id='divImage' style={{marginTop: "80px"}}>
          <Paper id='paper' elevation={6}>
            <img
              id='gymgptLogo'
              src={"/images/GymGPT.png"}/>
            <h1>Registro</h1>
            <p>Cumple tus objetivos con la ayuda de un entrenador virtual potenciado con inteligencia artificial.</p>
            <Grid2 container direction="column" spacing={2}>
              <Grid2 item>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Correo electrónico" variant="outlined" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Contraseña" variant="outlined" type="password" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="outlined-basic" label="Confirmar contraseña" variant="outlined" type="password" fullWidth />
              </Grid2>
              <Grid2 item>
                <Button type='button' onClick={submitRegister} className='colors boton' variant="contained" color="primary" fullWidth> Registrarse </Button>
              </Grid2>
              <Grid2 item>
                <span>¿Ya tienes cuenta? <a href='/login' style={{cursor: 'pointer', color: '#1f51b5'}}>Inicia Sesión</a></span>
              </Grid2>
            </Grid2>
          </Paper>  
        </div>
      </body>

    </>
  )
}
