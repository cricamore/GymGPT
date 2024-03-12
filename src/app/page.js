import { AppBar, Button, Container, Paper, TextField, Toolbar } from '@mui/material'
import React from 'react'
import Image from "next/image";
import "./login.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function Login() {
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
                <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" type='password' fullWidth />
              </Grid2>
              <Grid2 item>
                <Button className='colors boton' variant="contained" color="primary" fullWidth> Iniciar Sesión </Button>
              </Grid2>
              <Grid2 item>
                <a>Restablecer contraseña</a>
              </Grid2>
              
            </Grid2>
          </Paper>  
        </div>
      </body>

    </>
  )
}
