import { useState, useEffect } from 'react'
import { ChatResponse } from '../pages/Home'

export const useThreadedConversation = (
  chatResponse: ChatResponse[],
  threadSize: number
): [string[], React.Dispatch<React.SetStateAction<string[]>>] => {
  const [conversation, setConversation] = useState<string[]>([]);
  const [convoStore, setConvoStore] = useChatResponse('conversation', chatResponse);

  useEffect(() => {
    const latestChatResponses = convoStore.slice(-threadSize);

    const formattedConversation = latestChatResponses.map(
      (chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`
    );

    setConversation(formattedConversation);
  }, [convoStore, threadSize]);

  return [conversation, setConversation];
};

// Define the hook
export const useChatResponse = (localStorageKey: string, chatResponse?: ChatResponse[]): [
  ChatResponse[],
  React.Dispatch<React.SetStateAction<ChatResponse[]>>
] => {
  const [conversation, setConversation] = useState<ChatResponse[]>(() => {
    const storedConversation = localStorage.getItem(localStorageKey);
    if (storedConversation) {
      return JSON.parse(storedConversation);
    } else if (chatResponse) {
      return chatResponse;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(conversation));
  }, [conversation, localStorageKey]);

  return [conversation, setConversation];
};