import { render, fireEvent, waitFor } from '@testing-library/react'
import { FormWithParagraph } from './FormFields'

describe('FormWithParagraph', () => {
  // test('renders form fields and submits data', async () => {
  //   const { getByLabelText, getByText } = render(
  //     <FormWithParagraph
  //       fields={[
  //         "Hello, I'm ",
  //         { name: 'name', type: 'text' },
  //         " and I'm ",
  //         { name: 'age', type: 'number' },
  //         " years old, and I'm a ",
  //         {
  //           name: 'gender',
  //           type: 'select',
  //           options: ['Male', 'Female', 'Other'],
  //         },
  //         '.',
  //       ]}
  //     />
  //   )
  //   // Fill out form fields
  //   fireEvent.change(getByLabelText('Name'), { target: { value: 'John' } })
  //   fireEvent.change(getByLabelText('Age'), { target: { value: '30' } })
  //   fireEvent.change(getByLabelText('Gender'), { target: { value: 'Male' } })
  //   // Submit form
  //   fireEvent.click(getByText('Submit'))
  //   // Assert that the data was submitted correctly
  //   await waitFor(() => {
  //     expect(console.log).toHaveBeenCalledWith(
  //       "Hello, I'm John and I'm 30 years old, and I'm a Male."
  //     )
  //   })
  // })
})
