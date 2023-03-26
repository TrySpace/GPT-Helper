import { Container, GlobalStyles, Theme } from '@mui/material'
import { useState } from 'react'
import { theme } from '.'
import Navbar from './components/Navbar'

import Home from './pages/Home'

export const inputGlobalStyles = (themeObject: Theme) => (
  <GlobalStyles
    styles={{
      '#root, body': {
        backgroundColor: themeObject.palette.background.paper,
      },
      '#root, html, body': {
        '&::-webkit-scrollbar-track': {
          boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          backgroundColor: themeObject.palette.background.default,
        },
        '&::-webkit-scrollbar': {
          width: 6,
          backgroundColor: themeObject.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: themeObject.palette.secondary.main,
        },
      },
      div: {
        '&::-webkit-scrollbar-track': {
          boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
          backgroundColor: themeObject.palette.background.paper,
        },
        '&::-webkit-scrollbar': {
          width: 6,
          backgroundColor: themeObject.palette.background.paper,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: themeObject.palette.secondary.main,
        },
      },
      '#recent-tags-body': {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      a: {
        color: themeObject.palette.primary.light,
      },
    }}
  />
)

function App() {
  const [showSettings, setShowSettings] = useState(true)

  return (
    <>
      {inputGlobalStyles(theme)}
      <Navbar showSettings={showSettings} setShowSettings={setShowSettings}>
        {/* <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
          {persona}
        </Typography> */}
        {/* <IconButton color="inherit">
          <Icon>reload</Icon>
        </IconButton> */}
      </Navbar>
      <Container maxWidth="xl">
        <Home showSettings={showSettings} />
      </Container>
    </>
  )
}

export default App
