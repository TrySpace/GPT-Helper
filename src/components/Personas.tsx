import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'

const Personas = ({ personaValue, setPersona, personaKey, persona }) => {
  const handlePersonaChange = (event) => {
    const evt = event as ChangeEvent<HTMLInputElement>
    setPersona(evt.target.value)
  }

  return (
    <RadioGroup name={personaKey}>
      <FormControlLabel
        value={personaValue}
        control={<Radio />}
        label={personaKey}
        checked={persona === personaValue}
        onChange={handlePersonaChange}
      />
    </RadioGroup>
  )
}

export default Personas
