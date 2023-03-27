import { useEffect, useState } from 'react'

import { Container, Icon, IconButton, Typography } from '@mui/material'

import { appTheme } from './'
import Navbar from './components/Navbar'
import { inputGlobalStyles } from './config/globalStyles'
import { PERSONAS, Persona } from './config/personas'
import Home from './pages/Home'
import useAppStore from './store/appstore'

function App() {
  const [persona, setPersona] = useState<Persona>('default')
  const [personaText, setPersonaText] = useState<string>(PERSONAS.default)

  const { theme, settingsOpen, setSettingsOpen } = useAppStore()

  useEffect(() => {
    setPersonaText(PERSONAS[persona])
  }, [persona])

  return (
    <>
      {inputGlobalStyles(appTheme(theme))}
      <Navbar showSettings={settingsOpen} setShowSettings={setSettingsOpen}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {persona}
        </Typography>
        <IconButton color="inherit">
          <Icon>flare</Icon>
        </IconButton>
      </Navbar>
      <Container maxWidth="xl">
        <Home
          showSettings={settingsOpen}
          setPersona={setPersona}
          personaText={personaText}
        />
      </Container>
    </>
  )
}

export default App
