import { useEffect, useState } from 'react'

import { Container, Typography } from '@mui/material'

import { theme } from './'
import Navbar from './components/Navbar'
import { inputGlobalStyles } from './config/globalStyles'
import Home from './pages/Home'
import { Persona, PERSONAS } from './config/personas'

function App() {
  const [showSettings, setShowSettings] = useState(true)
  const [persona, setPersona] = useState<Persona>('default')
  const [personaText, setPersonaText] = useState<string>(PERSONAS.default)

  useEffect(() => {
    setPersonaText(PERSONAS[persona])
  }, [persona])

  return (
    <>
      {inputGlobalStyles(theme)}
      <Navbar showSettings={showSettings} setShowSettings={setShowSettings}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {persona}
        </Typography>
        {/* <IconButton color="inherit">
          <Icon>reload</Icon>
        </IconButton> */}
      </Navbar>
      <Container maxWidth="xl">
        <Home
          showSettings={showSettings}
          setPersona={setPersona}
          personaText={personaText}
        />
      </Container>
    </>
  )
}

export default App
