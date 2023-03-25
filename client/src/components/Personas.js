import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

const Personas = ({ personaValue, setPersona, personaKey, persona }) => {
  return (
    <RadioGroup name={personaKey}>
      <FormControlLabel
        value={personaValue}
        control={<Radio />}
        label={personaKey}
        checked={persona === personaValue}
        onChange={(event) => setPersona(event.target.value)}
        className="mg-top-sm"
      />
    </RadioGroup>
  )
}

export default Personas
