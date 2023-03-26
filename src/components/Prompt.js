import { useState } from 'react'

const Prompt = ({ onSubmit, loading }) => {
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
    <div className="container auto content-center align mg-bot-lg ">
      <div className="container ">
        <form onKeyDown={handleKeyDown}>
          <textarea
            rows={rows}
            resize="none"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            cols="50"
            className="input-text bg-mid "
            onKeyDown={handleSubmit}
            autoFocus={true}
            placeholder="Ask a question"
          />
        </form>
        <div className="loader ">
          {loading && <div className="spinner "></div>}
        </div>
      </div>
    </div>
  )
}

export default Prompt

export const FloatingInput = () => {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputFocus = () => {
    const input = inputRef.current
    if (input) {
      input.style.position = 'fixed'
      input.style.bottom = 0
    }
  }

  const handleInputBlur = () => {
    const input = inputRef.current
    if (input) {
      input.style.position = 'static'
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <label htmlFor="floating-input">Type something:</label>
      <input
        ref={inputRef}
        type="text"
        id="floating-input"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        style={{
          width: '100%',
          height: 50,
          border: '1px solid #ccc',
          borderRadius: 5,
          padding: 10,
        }}
      />
    </div>
  )
}
