import { FaCog } from 'react-icons/fa'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

interface NavbarProps {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
  showSettings: boolean
  children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> = ({
  setShowSettings,
  showSettings,
  children,
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {children}
        <FaCog
          className="icon auto-right mg-right-lg pointer"
          onClick={() => setShowSettings(!showSettings)}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
