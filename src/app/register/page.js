import React from 'react'
import { AppBar, Button, Container, Paper, TextField, Toolbar } from '@mui/material'
import Image from "next/image";
import "./page.css";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function Register() {
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
                <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" fullWidth />
              </Grid2>
              <Grid2 item>
                <TextField id="outlined-basic" label="Contraseña" variant="outlined" type="password" fullWidth />
              </Grid2>
              <Grid2 item>
                <Button className='colors boton' variant="contained" color="primary" fullWidth> Registrarse </Button>
              </Grid2>
            </Grid2>
          </Paper>  
        </div>
      </body>

    </>
  )
}
