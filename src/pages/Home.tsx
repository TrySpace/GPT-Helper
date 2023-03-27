import { useEffect, useState } from 'react'

import { Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { useGPTApi } from '../api'
import Error from '../components/Error'
import PromptController from '../components/PromptController'
import PromptInput from '../components/PromptInput'
import ChatResponse from '../components/ChatResponse'
import { Persona } from '../config/personas'
import { useChatResponse, useThreadedConversation } from '../hooks/conversation'

const Home = ({
  showSettings,
  setPersona,
  personaText,
}: {
  showSettings: boolean
  personaText: string
  setPersona: React.Dispatch<React.SetStateAction<Persona>> // (persona: Persona) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')

  // Values for PromptController
  const [temperature, setTemperature] = useState(0.5)
  const [tokens, setTokens] = useState(512)
  const [nucleus, setNucleus] = useState(0.5)
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo')
  const [threadSize, setThreadSize] = useState(3)

  // Values for Conversation
  const [conversation, setConversation] = useThreadedConversation(
    [],
    threadSize
  )

  // Values for Response
  const [chatResponse, setChatResponse] = useChatResponse('conversation')

  const onSubmit = async (event, question) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    event.preventDefault()
    setLoading(true)

    const gpt = useGPTApi({
      question,
      chatResponse,
      selectedModel,
      conversation,
      personaText,
      nucleus,
      tokens,
      temperature,
    })
    await gpt.then((res) => {
      console.log(`🚀 ~ gpt.then ~ res:`, res)
      if (res.error) {
        setError(res.error)
        setShowError(true)
      } else if (res.chatResponse) {
        setChatResponse(res.chatResponse)
        setShowError(false)
      } else {
        setError('Unknown gpt api error')
        setShowError(true)
      }
      setLoading(false)
    })
  }

  const clickReset = () => {
    setChatResponse([])
    setConversation([])
    localStorage.removeItem('conversation')
  }

  // Scrolls to bottom of the page as new content is created
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [chatResponse])

  return (
    <Box sx={{}}>
      <Grid container spacing={1} sx={{ pb: '60px' }}>
        <Grid item xs={12}>
          {showError && <Alert severity="error">{error}</Alert>}
        </Grid>
        <Grid item xs={12}>
          {showError && (
            <Error
              {...{
                setShowError,
                error,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {chatResponse &&
              chatResponse.map((item, index) => (
                <ChatResponse {...item} key={index} />
              ))}
          </Stack>
          <PromptController
            {...{
              clickReset,
              tokens,
              nucleus,
              personaText,
              threadSize,
              showSettings,
              setTokens,
              setNucleus,
              setPersona,
              temperature,
              setThreadSize,
              setTemperature,
              setChatResponse,
              selectedModel,
              setSelectedModel,
            }}
          />
        </Grid>
      </Grid>
      <PromptInput onSubmit={onSubmit} loading={loading} />
    </Box>
  )
}

export default Home
