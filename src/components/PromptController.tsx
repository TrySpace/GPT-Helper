import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import PersonaOption from './PersonaOption'

import React, { ChangeEvent } from 'react'
import { Persona, PERSONAS } from '../config/personas'
import usePromptControllerStore from '../store/prompt'
import { useStore } from 'zustand'

interface InputProps {
  name: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  max?: string
  step?: string
  title?: string
}

const RangeComponent = ({
  name,
  value,
  min,
  max,
  step,
  onChange,
  title,
}: InputProps) => {
  return (
    <input
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      title={title}
    />
  )
}

const ModelSelect = ({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: string
  setSelectedModel: (model: string) => void
}) => {
  const handleChange = (event) => {
    const evt = event as ChangeEvent<HTMLSelectElement>
    setSelectedModel(evt.target.value)
  }

  return (
    <FormControl variant="outlined">
      <InputLabel id="model-select-label">Select a model</InputLabel>
      <Select
        labelId="model-select-label"
        id="model-select"
        value={selectedModel}
        onChange={handleChange}
        label="Select a model"
      >
        {/* <MenuItem value="gpt-4">GPT-4</MenuItem> */}
        <MenuItem value="gpt-3.5-turbo">GPT-3.5-Turbo</MenuItem>
        <MenuItem value="text-davinci-003">Davinci</MenuItem>
        <MenuItem value="code-davinci-002">Code-Davinci</MenuItem>
        <MenuItem value="text-curie-001">Curie</MenuItem>
        <MenuItem value="text-babbage-001">Babbage</MenuItem>
        <MenuItem value="text-ada-001">Ada</MenuItem>
      </Select>
    </FormControl>
  )
}

interface PromptControllerProps {
  personaText: string
  clickReset: (e) => void
  showSettings: boolean
}
const PromptController = ({
  personaText,
  clickReset,
  showSettings,
}: PromptControllerProps) => {
  const personasArray = Object.entries(PERSONAS)

  const {
    setPersona,
    temperature,
    setTemperature,
    tokens,
    setTokens,
    nucleus,
    setNucleus,
    selectedModel,
    setSelectedModel,
    threadSize,
    setThreadSize,
  } = useStore(usePromptControllerStore)

  return (
    <Stack
      spacing={2}
      sx={{
        overflowY: 'auto',
      }}
    >
      <Stack>
        <Typography variant="h6">Personalities</Typography>
        <Divider />

        {personasArray.map(([key, value], index) => {
          return (
            <PersonaOption
              key={index}
              personaValue={value}
              personaKey={key}
              personaText={personaText}
              setPersona={setPersona}
            />
          )
        })}
      </Stack>

      <ModelSelect
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <InputLabel htmlFor="temperature">{`Temperature: ${temperature}`}</InputLabel>
      <RangeComponent
        name="temperature"
        value={temperature}
        min="0"
        max="1"
        step=".1"
        onChange={(event) => setTemperature(Number(event.target.value))}
        title="This will adjust the randomness of the conversation. Setting to 0 will be straightforward, setting to 1 will be more random."
      />
      <InputLabel>{`Diversity: ${nucleus}`}</InputLabel>
      <RangeComponent
        name="top_p"
        value={nucleus}
        min="0"
        max="1"
        step=".1"
        onChange={(event) => setNucleus(Number(event.target.value))}
        title="The top_p parameter is used to control the diversity of the generated text. The higher the value the more diverse the generated text will be."
      />
      <InputLabel>{`Max Tokens: ${tokens}`}</InputLabel>
      <RangeComponent
        name="tokens"
        value={tokens}
        min="5"
        max="2048"
        onChange={(event) => setTokens(Number(event.target.value))}
        title="Sets max_token parameter in the api call. GPT will not generate more than the set tokens. This setting does not stop requests at the set tokens."
      />
      <InputLabel>{`Max Threads: ${threadSize}`}</InputLabel>
      <RangeComponent
        name="tokens"
        value={threadSize}
        min="1"
        max="10"
        step="1"
        onChange={(event) => setThreadSize(Number(event.target.value))}
        title="Sets the max thread size. This will set how large the chat bots memory can be."
      />

      <Button
        title="Reset the conversation thread. As the conversation gets bigger, so will the token requirements."
        onClick={clickReset}
        sx={{
          width: '100%',
        }}
      >
        Reset
      </Button>
    </Stack>
  )
}

export default PromptController
