import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'
import { Persona } from '../config/personas'

interface PersonaOptionProps {
  personaValue: string | unknown
  setPersona: React.Dispatch<React.SetStateAction<Persona>>
  personaKey: string
  personaText: string
}

const PersonaOption: React.FC<PersonaOptionProps> = ({
  personaValue,
  setPersona,
  personaKey,
  personaText,
}) => {
  const handlePersonaChange = (event) => {
    const evt = event as ChangeEvent<HTMLInputElement>
    setPersona(evt.target.value as Persona)
  }

  return (
    <RadioGroup name={personaKey}>
      <FormControlLabel
        value={personaKey}
        control={<Radio />}
        label={personaKey}
        checked={personaText === personaValue}
        onChange={handlePersonaChange}
      />
    </RadioGroup>
  )
}

export default PersonaOption
