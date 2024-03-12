'use client';
import { AppBar, Button, Container, Paper, TextField, Toolbar } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { router } from 'next/router'
import "./page.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function Login() {
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    return async () => {
      try {
        const response = await login(email, password);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      router.push("/");
    }
  }

  return (
    <>
      <head>
        <title>Login</title>
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
            <h1>¡Bienvenida!</h1>
            <p>Cumple tus objetivos con la ayuda de un entrenador virtual potenciado con inteligencia artificial.</p>
            <Grid2 container direction="column" spacing={2}>
            <Grid2 item>
                <p> ¿No tienes una cuenta? <a href='/register'>Regístrate</a> </p>
              </Grid2>
              <Grid2 item>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Correo electrónico" variant="outlined" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Contraseña" variant="outlined" type='password' fullWidth />
              </Grid2>
              <Grid2 item>
                <Button type='button' onClick={submitLogin} className='colors boton' variant="contained" color="primary" fullWidth> Iniciar Sesión </Button>
              </Grid2>
              <Grid2 item>
                <span>¿No tienes cuenta? <a style={{cursor: 'pointer', color: '#1f51b5'}}>Regístrate</a></span>
              </Grid2>
              
            </Grid2>
          </Paper>  
        </div>
      </body>

    </>
  )
}
