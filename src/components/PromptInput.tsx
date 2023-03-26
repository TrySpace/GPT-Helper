import { useState } from 'react'
import { Box, CircularProgress, TextField } from '@mui/material'

const PromptInput = ({ onSubmit, loading }) => {
  const [rows, setRows] = useState(1)
  const [question, setQuestion] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
      setRows(rows + 1)
    }
  }

  const handleSubmit = async (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      setRows(1)
      await onSubmit(event, question)
      setQuestion('')
    }
  }

  return (
    <Box
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
          backgroundColor: 'palette.background.default',
        }}
      >
        <TextField
          multiline
          rows={rows}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onKeyDown={handleSubmit}
          autoFocus
          placeholder="Ask a question"
          sx={{ backgroundColor: 'mid', width: '100%' }}
        />
      </Box>
      {loading && (
        <Box sx={{ marginLeft: 'medium' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default PromptInput

// export const FloatingInput = () => {
//   const inputRef = useRef(null)
//   const [inputValue, setInputValue] = useState('')

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value)
//   }

//   const handleInputFocus = () => {
//     const input = inputRef.current
//     if (input) {
//       input.style.position = 'fixed'
//       input.style.bottom = 0
//     }
//   }

//   const handleInputBlur = () => {
//     const input = inputRef.current
//     if (input) {
//       input.style.position = 'static'
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <label htmlFor="floating-input">Type something:</label>
//       <input
//         ref={inputRef}
//         type="text"
//         id="floating-input"
//         value={inputValue}
//         onChange={handleInputChange}
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//         style={{
//           width: '100%',
//           height: 50,
//           border: '1px solid #ccc',
//           borderRadius: 5,
//           padding: 10,
//         }}
//       />
//     </div>
//   )
// }
