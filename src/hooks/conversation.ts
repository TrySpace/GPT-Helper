import { useState, useEffect } from 'react'
import { ChatResponse } from '../components/ChatResponse';

export const useLocalStorage = <T>(localStorageKey: string, data?: T[]): [
  T[],
  React.Dispatch<React.SetStateAction<T[]>>
] => {
  const [storage, setStorage] = useState<T[]>(() => {
    const storageItem = localStorage.getItem(localStorageKey);
    if (storageItem) {
      return JSON.parse(storageItem) as T[]
    } else if (data) {
      return data;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(storage));
  }, [storage, localStorageKey]);

  return [storage, setStorage];
};

export const useThreadedConversation = (
  chatResponse: ChatResponse[],
  threadSize: number
): [string[], React.Dispatch<React.SetStateAction<string[]>>] => {
  const [conversation, setConversation] = useState<string[]>([]);
  const [convoStore, setConvoStore] = useLocalStorage<ChatResponse>('conversation', chatResponse);

  useEffect(() => {
    const latestChatResponses = convoStore.slice(-threadSize);

    const formattedConversation = latestChatResponses.map(
      (chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`
    );

    setConversation(formattedConversation);
  }, [convoStore, threadSize]);

  return [conversation, setConversation];
};

