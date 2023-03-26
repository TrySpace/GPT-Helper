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
import { PERSONAS } from '../config/personas'
import { Stack } from '@mui/material'

interface ChatResponse {
  botResponse: string
  promptQuestion: string
  totalTokens: string
}

const convoStore = localStorage.getItem('conversation')
// @ts-ignore
let savedConversation = JSON.parse(convoStore)
if (savedConversation) console.log('localstorage', savedConversation)

const Home = ({
  showSettings,
  setPersona,
  personaText,
}: {
  showSettings: boolean
  personaText: string
  setPersona: (persona: string) => void
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
    event.preventDefault()
    setLoading(true)
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
    }

    console.log(`🚀 ~ onSubmit ~ selectedModel:`, selectedModel)
    if (selectedModel === 'gpt-3.5-turbo') {
      // Sets the prompt with instructions.
      const promptOptions = `Respond to the user in markdown. ${personaText} `

      const promptData = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `${promptOptions}\n${conversation}\n${question}\n`,
          },
        ],
        n: 1,
        top_p: Number(nucleus),
        max_tokens: Number(tokens),
        temperature: Number(temperature),
      }
      console.log(`🚀 ~ onSubmit ~ promptData:`, promptData)

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          promptData,
          options
        )
        console.log(`🚀 ~ onSubmit ~ response:`, response)
        const newChat: ChatResponse = {
          botResponse: response.data.choices[0].message.content,
          promptQuestion: question,
          totalTokens: response.data.usage.total_tokens,
        }
        console.log(`🚀 ~ onSubmit ~ newChat:`, newChat)

        setLoading(false)
        setChatResponse([...chatResponse, newChat])
      } catch (error) {
        setLoading(false)
        console.log(error)
        // @ts-expect-error
        setError(error?.response?.data?.error.message)
      }
    } else {
      const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${personaText} STOP `
      const promptData = {
        model: selectedModel,
        prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
        top_p: Number(nucleus),
        max_tokens: Number(tokens),
        temperature: Number(temperature),
        n: 1,
        stream: false,
        logprobs: null,
        stop: ['STOP', 'User:'],
      }
      console.log(`🚀 ~ onSubmit ~ promptData:`, promptData)

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/completions',
          promptData,
          options
        )
        console.log(`🚀 ~ onSubmit ~ response:`, response)
        const newChat = {
          botResponse: response.data.choices[0].text,
          promptQuestion: question,
          totalTokens: response.data.usage.total_tokens,
        }
        console.log(`🚀 ~ onSubmit ~ newChat:`, newChat)

        setLoading(false)
        setChatResponse([...chatResponse, newChat])
      } catch (err) {
        setLoading(false)
        // @ts-expect-error
        setError(err?.response?.data.error.message)
        setShowError(true)
        // @ts-expect-error
        console.log(err?.response)
      }
    }
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
    personas: PERSONAS,
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
