import { Container } from '@mui/material'
import { useState } from 'react'
import Navbar from './components/Navbar'

import Home from './pages/Home'

function App() {
  const [showSettings, setShowSettings] = useState(true)

  return (
    <>
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
