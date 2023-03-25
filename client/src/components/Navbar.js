import { FaCog } from 'react-icons/fa'

import { AppBar } from '@mui/material/AppBar'
import { Toolbar } from '@mui/material/Toolbar'

const Navbar = ({ setShowSettings, showSettings, children }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <nav className="navbar">
          {children}
          <FaCog
            className="icon auto-right mg-right-lg pointer"
            onClick={() => setShowSettings(!showSettings)}
          />
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
