import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import Personas from './Personas'

import React, { ChangeEvent } from 'react'

interface InputProps {
  name: string
  type: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  max?: string
  step?: string
  title?: string
}

const InputComponent = ({
  name,
  type,
  value,
  min,
  max,
  step,
  onChange,
  title,
}: InputProps) => {
  return (
    <input
      type={type}
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

const PromptController = ({
  temperature,
  setTemperature,
  tokens,
  setTokens,
  selectedModel,
  setSelectedModel,
  nucleus,
  setNucleus,
  setPersona,
  personaText,
  personas,
  setThreadSize,
  threadSize,
  reset,
  showSettings,
}) => {
  const personasArray = Object.entries(personas)
  return (
    <Card
      className={`${showSettings ? 'settings' : 'settings hide'}`}
      sx={{
        overflowY: 'scroll',
        maxHeight: '80vh',
        maxWidth: '90vw',
        p: 1,
      }}
    >
      <Typography variant="h6" className="text-center mg-top-md">
        Personalities
      </Typography>
      <div className="underline-full mg-top-sm"></div>
      <Box className="mg-top-sm">
        {personasArray.map(([key, value], index) => {
          return (
            <Personas
              key={index}
              personaValue={value}
              personaKey={key}
              personaText={personaText}
              setPersona={setPersona}
            />
          )
        })}
      </Box>

      <form>
        <Stack spacing={1}>
          <ModelSelect
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <InputLabel htmlFor="temperature">{`Temperature: ${temperature}`}</InputLabel>
          <InputComponent
            type="range"
            name="temperature"
            value={temperature}
            min="0"
            max="1"
            step=".1"
            onChange={(event) => setTemperature(event.target.value)}
            title="This will adjust the randomness of the conversation. Setting to 0 will be straightforward, setting to 1 will be more random."
          />
          <InputLabel>{`top_p: ${nucleus}`}</InputLabel>
          <InputComponent
            type="range"
            name="top_p"
            value={nucleus}
            min="0"
            max="1"
            step=".1"
            onChange={(event) => setNucleus(event.target.value)}
            title="The top_p parameter is used to control the diversity of the generated text. The higher the value the more diverse the generated text will be."
          />
          <InputLabel>{`Tokens: ${tokens}`}</InputLabel>
          <InputComponent
            type="range"
            name="tokens"
            value={tokens}
            min="5"
            max="2048"
            onChange={(event) => setTokens(event.target.value)}
            title="Sets max_token parameter in the api call. GPT will not generate more than the set tokens. This setting does not stop requests at the set tokens."
          />
          <InputLabel>{`Max Threads: ${threadSize}`}</InputLabel>
          <InputComponent
            type="range"
            name="tokens"
            value={threadSize}
            min="1"
            max="10"
            step="1"
            onChange={(event) => setThreadSize(event.target.value)}
            title="Sets the max thread size. This will set how large the chat bots memory can be."
          />
        </Stack>
      </form>
      <Button
        className="btn"
        title="Reset the conversation thread. As the conversation gets bigger, so will the token requirements."
        onClick={reset}
      >
        Reset
      </Button>
    </Card>
  )
}

export default PromptController
