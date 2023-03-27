import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import App from './App'

export const appTheme = (mode: PaletteMode = 'dark') =>
  createTheme({
    palette: {
      mode,
    },
    // status: {
    //   danger: 'fff',
    // },
  })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
