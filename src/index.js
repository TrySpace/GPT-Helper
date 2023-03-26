import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import CssBaseline from '@mui/material/CssBaseline'
import './index.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  status: {
    danger: 'fff',
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
