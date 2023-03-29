import { useEffect, useState } from 'react'
import { useStore } from 'zustand'

import { Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

import { useGPTApi } from '../api'
import { ChatResponse, ChatResponseLoading } from '../components/ChatResponse'
import Drawer from '../components/Drawer'
import Error from '../components/Error'
import PromptController from '../components/PromptController'
import PromptInput, { CHAT_INPUT_HEIGHT } from '../components/PromptInput'
import { Persona } from '../config/personas'
import { useLocalStorage, useThreadedConversation } from '../hooks/conversation'
import useAppStore from '../store/appstore'
import usePromptControllerStore from '../store/prompt'
import Typography from '@mui/material/Typography'
import { QuestionAnswer } from '../components/QuestionAnswer'

const Home = ({
  showSettings,
  personaText,
}: {
  showSettings: boolean
  personaText: string
}) => {
  const { loading, setLoading } = useAppStore()
  const [showError, setShowError] = useState(false)
  const [q, setQ] = useState('')
  const [error, setError] = useState('')

  // Values from PromptController
  const {
    persona,
    setPersona,
    temperature,
    tokens,
    nucleus,
    selectedModel,
    threadSize,
    resetPromptSettings,
  } = useStore(usePromptControllerStore)

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
    setQ(question)

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
    resetPromptSettings()
  }

  // Scrolls to bottom of the page as new content is created
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [chatResponse])

  return (
    <Drawer
      header={persona}
      content={
        <PromptController
          {...{
            clickReset,
            personaText,
            showSettings,
            setChatResponse,
          }}
        />
      }
    >
      <Grid
        container
        spacing={1}
        sx={{
          pb: `calc(${CHAT_INPUT_HEIGHT} + 8px)`, // Force extra height at bottom
          width: '100%',
        }}
      >
        <Grid item xs={12}>
          {/* <QuestionAnswer question="hi" answer="hello" /> */}
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
          <Stack spacing={2}>
            {chatResponse &&
              chatResponse.map((item, index) => (
                <ChatResponse {...item} key={index} />
              ))}
            {loading && <ChatResponseLoading promptQuestion={q} />}
          </Stack>
        </Grid>
        <PromptInput onSubmit={onSubmit} loading={loading} />
      </Grid>
    </Drawer>
  )
}

export default Home
