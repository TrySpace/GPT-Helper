import axios from 'axios'

import { ChatResponse } from './pages/Home'

export async function useGPTApi({
  question,
  chatResponse,
  selectedModel,
  conversation,
  personaText,
  nucleus,
  tokens,
  temperature,
}: {
  question: string
  chatResponse: ChatResponse[]
  selectedModel: string
  conversation: string[] | string
  personaText: string
  nucleus: number
  tokens: number
  temperature: number
}): Promise<{
  error?: string
  chatResponse?: ChatResponse[]
}> {
  const options = {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
  }
  if (selectedModel === 'gpt-3.5-turbo') {
    // Sets the prompt with instructions.
    const promptOptions = `Respond to the user in markdown. ${personaText} `

    const promptData = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          content: `${promptOptions}\n${conversation}\n${question}\n`,
        },
      ],
      n: 1,
      top_p: Number(nucleus),
      max_tokens: Number(tokens),
      temperature: Number(temperature),
    }
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        promptData,
        options
      )
      const newChat: ChatResponse = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        botResponse: response.data.choices[0].message.content,
        promptQuestion: question,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        totalTokens: response.data.usage.total_tokens,
      }

      return { chatResponse: [...chatResponse, newChat] }
    } catch (err) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return { error: err?.response?.data?.error.message }
    }
  } else {
    const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${personaText} STOP `
    const promptData = {
      model: selectedModel,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
      top_p: Number(nucleus),
      max_tokens: Number(tokens),
      temperature: Number(temperature),
      n: 1,
      stream: false,
      logprobs: null,
      stop: ['STOP', 'User:'],
    }
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        promptData,
        options
      )
      console.log(`🚀 ~ onSubmit ~ response:`, response)
      const newChat = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        botResponse: response.data.choices[0].text,
        promptQuestion: question,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        totalTokens: response.data.usage.total_tokens,
      }
      console.log(`🚀 ~ onSubmit ~ newChat:`, newChat)

      return { chatResponse: [...chatResponse, newChat] }
    } catch (err) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return { error: err?.response?.data?.error.message }
    }
  }
}
