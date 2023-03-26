import { useEffect, useState } from 'react'
import axios from 'axios'

import Response from '../components/Response'
import Navbar from '../components/Navbar'
import PromptInput from '../components/PromptInput'
import PromptController from '../components/PromptController'
import Error from '../components/Error'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import Icon from '@mui/material/Icon'
import { Persona, PERSONAS } from '../config/personas'
import { Stack } from '@mui/material'
import { useGPTApi } from '../api'

export interface ChatResponse {
  botResponse: string
  promptQuestion: string
  totalTokens: string
}

const convoStore = localStorage.getItem('conversation')
// @ts-ignore
let savedConversation: ChatResponse[] = JSON.parse(convoStore)
if (savedConversation) console.log('localstorage', savedConversation)

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

  // Values for Prompt
  const [conversation, setConversation] = useState<string[] | string>('')

  // Values for Completion
  const [chatResponse, setChatResponse] = useState<ChatResponse[]>(
    savedConversation || []
  )

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
      }
      setLoading(false)
    })
  }

  const reset = () => {
    setChatResponse([])
    setConversation('')
    localStorage.removeItem('conversation')
  }

  // Scrolls to bottom of the page as new content is created
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [chatResponse])

  useEffect(() => {
    if (chatResponse.length > threadSize) {
      const newArray = [...chatResponse]
      console.log(`🚀 ~ useEffect ~ chatResponse:`, chatResponse)
      newArray.splice(0, newArray.length - threadSize)
      setConversation(
        newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`)
      )
      savedConversation = chatResponse
      localStorage.setItem('conversation', JSON.stringify(savedConversation))
    } else {
      setConversation(
        chatResponse.map(
          (chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`
        )
      )
      savedConversation = chatResponse
      localStorage.setItem('conversation', JSON.stringify(savedConversation))
    }
  }, [chatResponse, threadSize])

  // Props for Prompt component
  const forPrompt = { onSubmit, loading }

  // Props for PromptController
  const forPrompController = {
    reset,
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
  }

  const forError = {
    setShowError,
    error,
  }

  return (
    <Box sx={{}}>
      <Grid container spacing={1} sx={{ pb: '60px' }}>
        <Grid item xs={12}>
          {showError && <Alert severity="error">{error}</Alert>}
        </Grid>
        <Grid item xs={12}>
          {showError && <Error {...forError} />}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            {chatResponse &&
              chatResponse.map((item, index) => (
                <Response {...item} key={index} />
              ))}
          </Stack>
          <PromptController {...forPrompController} />
        </Grid>
      </Grid>
      <PromptInput {...forPrompt} />
    </Box>
  )
}

export default Home
