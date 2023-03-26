import { Icon, IconButton } from '@mui/material'
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
        <IconButton onClick={() => setShowSettings(!showSettings)}>
          <Icon>settings</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
