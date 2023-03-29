import React, { ChangeEvent } from 'react'
import { useStore } from 'zustand'

import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

import { PERSONAS } from '../config/personas'
import usePromptControllerStore from '../store/prompt'
import PersonaOption from './PersonaOption'

interface InputProps {
  name: string
  value: number
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number | number[],
    activeThumb: number
  ) => void
  min: number
  max: number
  step?: number
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
    <Slider
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      // @ts-ignore
      onChange={onChange}
      title={title}
      aria-label={title}
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
}
const PromptController = ({ personaText }: PromptControllerProps) => {
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
    <Stack spacing={2}>
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
        min={Number('0')}
        max={Number('1')}
        step={Number('.1')}
        onChange={(event) => setTemperature(Number(event?.target?.value))}
        title="This will adjust the randomness of the conversation. Setting to 0 will be straightforward, setting to 1 will be more random."
      />
      <InputLabel>{`Diversity: ${nucleus}`}</InputLabel>
      <RangeComponent
        name="top_p"
        value={nucleus}
        min={Number('0')}
        max={Number('1')}
        step={Number('.1')}
        onChange={(event) => setNucleus(Number(event?.target?.value))}
        title="The top_p parameter is used to control the diversity of the generated text. The higher the value the more diverse the generated text will be."
      />
      <InputLabel>{`Max Tokens: ${tokens}`}</InputLabel>
      <RangeComponent
        name="tokens"
        value={tokens}
        min={Number('5')}
        max={Number('2048')}
        onChange={(event) => setTokens(Number(event?.target?.value))}
        title="Sets max_token parameter in the api call. GPT will not generate more than the set tokens. This setting does not stop requests at the set tokens."
      />
      <InputLabel>{`Max Threads: ${threadSize}`}</InputLabel>
      <RangeComponent
        name="tokens"
        value={threadSize}
        min={Number('1')}
        max={Number('10')}
        step={Number('1')}
        onChange={(event) => setThreadSize(Number(event?.target?.value))}
        title="Sets the max thread size. This will set how large the chat bots memory can be."
      />
    </Stack>
  )
}

export default PromptController
