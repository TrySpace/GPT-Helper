import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'

const Personas = ({ personaValue, setPersona, personaKey, personaText }) => {
  const handlePersonaChange = (event) => {
    const evt = event as ChangeEvent<HTMLInputElement>
    console.log(
      `🚀 ~ handlePersonaChange ~ evt.target.value:`,
      evt.target.value
    )
    setPersona(evt.target.value)
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

export default Personas
