import React, { useState, KeyboardEvent } from 'react'
import { Box, Card, CircularProgress, TextField } from '@mui/material'

interface PromptInputProps {
  onSubmit: (
    event: KeyboardEvent<HTMLDivElement>,
    question: string
  ) => Promise<void>
  loading: boolean
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, loading }) => {
  const [rows, setRows] = useState(1)
  const [question, setQuestion] = useState('')

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
      setRows(rows + 1)
    }
  }

  const handleSubmit = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      setRows(1)
      onSubmit(event, question).catch((err) => {
        console.error(err)
      })
      setQuestion('')
    }
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
          onKeyDown={handleSubmit}
          autoFocus
          placeholder="Ask a question"
          sx={{
            width: '100%',
          }}
        />
      </Box>
      {loading && (
        <Box sx={{ marginLeft: 'medium' }}>
          <CircularProgress />
        </Box>
      )}
    </Card>
  )
}

export default PromptInput
