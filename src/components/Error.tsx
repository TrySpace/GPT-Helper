import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

interface ErrorProps {
  error: string
  setShowError: React.Dispatch<React.SetStateAction<boolean>>
}

const Error: React.FC<ErrorProps> = ({ error, setShowError }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(false)
    }, 8000)
    return () => clearTimeout(timeout)
  }, [setShowError])

  return (
    <Box>
      <Typography variant="h3">{error}</Typography>
    </Box>
  )
}

export default Error
