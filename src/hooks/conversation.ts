import { useState, useEffect } from 'react'
import { ChatResponse } from '../pages/Home'

export const useConversation = (chatResponse: ChatResponse[], threadSize: number) => {
  const [conversation, setConversation] = useState<string[] | string>('')

  useEffect(() => {
    if (chatResponse.length > threadSize) {
      const newArray = [...chatResponse]
      newArray.splice(0, newArray.length - threadSize)
      setConversation(
        newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`)
      )
    } else {
      setConversation(
        chatResponse.map(
          (chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`
        )
      )
    }
  }, [chatResponse, threadSize])

  return [conversation, setConversation]
}

export function useConvoStore(): ChatResponse[] {
  const [conversation, setConversation] = useState<ChatResponse[]>(() => {
    const convoStore = localStorage.getItem('conversation');
    return convoStore ? JSON.parse(convoStore) : [];
  });

  useEffect(() => {
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }, [conversation]);

  return conversation;
}