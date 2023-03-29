import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuestionAnswer } from './QuestionAnswer'

describe('QuestionAnswer component', () => {
  it('displays question and answer in the history lists', () => {
    const { getByText } = render(
      <QuestionAnswer question="What is the meaning of life?" answer="42" />
    )
    expect(getByText('What is the meaning of life?')).toBeInTheDocument()
    expect(getByText('42')).toBeInTheDocument()
  })

  // FIXME: GPT made this but it don't work
  // it('renders the component with the initial question and answer', () => {
  //   render(<QuestionAnswer question="Question 1" answer="Answer 1" />)
  //   const queryHistory = screen.getByText('Query History')
  //   const answerHistory = screen.getByText('Answer History')
  //   expect(queryHistory).toBeInTheDocument()
  //   expect(answerHistory).toBeInTheDocument()

  //   const questions = screen
  //     .getAllByRole('listitem')
  //     .filter((item) => item.textContent?.startsWith('Question'))
  //   const answers = screen
  //     .getAllByRole('listitem')
  //     .filter((item) => item.textContent?.startsWith('Answer'))

  //   expect(questions.length).toBe(1)
  //   expect(answers.length).toBe(1)
  // })
})
