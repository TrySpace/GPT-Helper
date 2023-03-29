import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography'
import { Select } from 'mui-rff'

const fields = [
  "Hello, I'm ",
  { name: 'name', type: 'text' },
  " and I'm ",
  { name: 'age', type: 'number' },
  " years old, and I'm a ",
  { name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  '.',
]

export function FormWithParagraph({ fields }) {
  const renderParagraph = (values) => {
    const parts = []
    fields.forEach((field, index) => {
      if (typeof field === 'string') {
        parts.push(<span key={index}>{field}</span>)
      } else {
        const { name, type, options } = field
        const value = values[name] || ''
        if (type === 'select') {
          parts.push(
            <Field key={index} name={name} initialValue={value}>
              {({ input }) => (
                <Select
                  {...input}
                  label={name}
                  options={options}
                  variant="outlined"
                />
              )}
            </Field>
          )
        } else {
          parts.push(
            <Field key={index} name={name}>
              {({ input }) => <input {...input} type={type} />}
            </Field>
          )
        }
      }
    })
    return <Typography>{parts}</Typography>
  }

  const transformDataToString = (values) => {
    let str = fields.reduce((acc, field) => {
      if (typeof field === 'string') {
        return acc + field
      } else {
        const { name } = field
        const value = values[name] || ''
        return acc + value
      }
    }, '')
    return str
  }

  const onSubmit = (values) => {
    const str = transformDataToString(values)
    console.log(str)
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={() => {
        return {}
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {renderParagraph(values)}
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )
}
