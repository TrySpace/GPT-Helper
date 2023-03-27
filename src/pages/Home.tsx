import { useEffect, useState } from 'react'
import { useStore } from 'zustand'

import { Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { useGPTApi } from '../api'
import { ChatResponse } from '../components/ChatResponse'
import Error from '../components/Error'
import PromptController from '../components/PromptController'
import PromptInput from '../components/PromptInput'
import { Persona } from '../config/personas'
import { useLocalStorage, useThreadedConversation } from '../hooks/conversation'
import useAppStore from '../store/appstore'
import usePromptControllerStore from '../store/prompt'

const Home = ({
  showSettings,
  setPersona,
  personaText,
}: {
  showSettings: boolean
  personaText: string
  setPersona: React.Dispatch<React.SetStateAction<Persona>> // (persona: Persona) => void
}) => {
  const { loading, setLoading } = useAppStore()
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')

  // Values from PromptController
  const { temperature, tokens, nucleus, selectedModel, threadSize } = useStore(
    usePromptControllerStore
  )

  // Values for Conversation
  const [conversation, setConversation] = useThreadedConversation(
    [],
    threadSize
  )

  // Values for Response
  const [chatResponse, setChatResponse] =
    useLocalStorage<ChatResponse>('conversation')

  const onSubmit = async (question: string) => {
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
              personaText,
              showSettings,
              setPersona,
              setChatResponse,
            }}
          />
        </Grid>
      </Grid>
      <PromptInput onSubmit={onSubmit} loading={loading} />
    </Box>
  )
}

export default Home
