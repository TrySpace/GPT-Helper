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
import Navbar from './components/Navbar'
import { inputGlobalStyles } from './config/globalStyles'
import { PERSONAS, Persona } from './config/personas'
import Home from './pages/Home'
import useAppStore from './store/appstore'

function App() {
  const [persona, setPersona] = useState<Persona>('default')
  const [personaText, setPersonaText] = useState<string>(PERSONAS.default)

  const { theme, setTheme, settingsOpen, setSettingsOpen } = useAppStore()

  useEffect(() => {
    setPersonaText(PERSONAS[persona])
  }, [persona])

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline />
      {inputGlobalStyles(appTheme(theme))}
      <Navbar showSettings={settingsOpen} setShowSettings={setSettingsOpen}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {persona}
        </Typography>
        <IconButton
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Icon>{theme === 'dark' ? 'light_mode' : 'dark_mode'}</Icon>
        </IconButton>
      </Navbar>
      <Container maxWidth="xl">
        <Home
          showSettings={settingsOpen}
          setPersona={setPersona}
          personaText={personaText}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
