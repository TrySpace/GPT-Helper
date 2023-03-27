import { useEffect, useState } from 'react'

import {
  Container,
  CssBaseline,
  Icon,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material'

import { appTheme } from './'
import { inputGlobalStyles } from './config/globalStyles'
import { PERSONAS, Persona } from './config/personas'
import Home from './pages/Home'
import useAppStore from './store/appstore'

function App() {
  const [persona, setPersona] = useState<Persona>('Default')
  const [personaText, setPersonaText] = useState<string>(PERSONAS.Default)

  const { theme, setTheme, settingsOpen, setSettingsOpen } = useAppStore()

  useEffect(() => {
    setPersonaText(PERSONAS[persona])
  }, [persona])

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline />
      {inputGlobalStyles(appTheme(theme))}
      <Container maxWidth="xl">
        <Home
          showSettings={settingsOpen}
          persona={persona}
          setPersona={setPersona}
          personaText={personaText}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
