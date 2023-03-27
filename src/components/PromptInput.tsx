import React, { useState, KeyboardEvent, MouseEventHandler } from 'react'
import {
  Box,
  Card,
  CircularProgress,
  Icon,
  IconButton,
  TextField,
} from '@mui/material'

interface PromptInputProps {
  onSubmit: (question: string) => Promise<void>
  loading: boolean
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, loading }) => {
  const [rows, setRows] = useState(1)
  const [question, setQuestion] = useState('')

  const submit = () => {
    setRows(1)
    onSubmit(question).catch((err) => {
      console.error(err)
    })
    setQuestion('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
      setRows(rows + 1)
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  const handleSubmitClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    submit()
  }

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 'large',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <Box
        component="form"
        onKeyDown={handleKeyDown}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextField
          multiline
          rows={rows}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Ask a question"
          sx={{
            width: '100%',
          }}
        />
      </Box>

      <IconButton
        aria-label="send"
        onClick={(e) => handleSubmitClick(e)}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : <Icon>send</Icon>}
      </IconButton>
    </Card>
  )
}

export default PromptInput
