import { useEffect, useState } from 'react'
import { useStore } from 'zustand'

import { Container, CssBaseline, ThemeProvider } from '@mui/material'

import { appTheme } from './'
import { inputGlobalStyles } from './config/globalStyles'
import { PERSONAS } from './config/personas'
import Home from './pages/Home'
import useAppStore from './store/appstore'
import usePromptControllerStore from './store/prompt'

function App() {
  const { persona } = useStore(usePromptControllerStore)
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
        <Home showSettings={settingsOpen} personaText={personaText} />
      </Container>
    </ThemeProvider>
  )
}

export default App
