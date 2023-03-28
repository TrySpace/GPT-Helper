import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

type QuestionHistoryItem = string
type AnswerHistoryItem = string

interface Props {
  question: string
  answer: string
}

export const QuestionAnswer: React.FC<Props> = ({ question, answer }) => {
  const [questionHistory, setQuestionHistory] = useState<QuestionHistoryItem[]>(
    [question]
  )
  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryItem[]>([
    answer,
  ])

  useEffect(() => {
    if (question) {
      updateQA(question, answer)
    }
  }, [question, answer])

  const addQueryToHistory = (query: string) => {
    setQuestionHistory((prevHistory) => {
      const previousQuery =
        prevHistory.length > 0 ? prevHistory[prevHistory.length - 1] : ''
      const newQuery = `${previousQuery} ${query}`
      return [...prevHistory, newQuery]
    })
  }

  const updateQA = (question: string, answer: string) => {
    setAnswerHistory((prevHistory) => [...prevHistory, answer])
    addQueryToHistory(question)
  }

  return (
    <div>
      <Typography variant="h4">Query History</Typography>
      <List>
        {questionHistory.map((query, index) => (
          <ListItem key={index}>
            <ListItemText primary={query} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h4">Answer History</Typography>
      <List>
        {answerHistory.map((answer, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${answer}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
