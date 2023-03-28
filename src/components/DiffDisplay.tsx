import { Fragment } from 'react'
import Diff from 'diff'
import Typography from '@mui/material/Typography'

export function DiffDisplay() {
  const one = 'beep boop'
  const other = 'beep boob blah'

  const diff = Diff.diffChars(one, other)

  return (
    <Typography component="pre">
      {diff.map((part, index) => {
        const color = part.added ? 'green' : part.removed ? 'red' : 'grey'

        return (
          <Fragment key={index}>
            <span style={{ color }}>{part.value}</span>
          </Fragment>
        )
      })}
    </Typography>
  )
}
