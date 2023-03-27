import { act, renderHook } from '@testing-library/react-hooks'

import { useLocalStorage, useThreadedConversation } from './conversation'
import { ChatResponse } from '../components/ChatResponse'


describe('useThreadedConversation', () => {
  const testResponse: ChatResponse[] = [
    { promptQuestion: 'Hello?', botResponse: 'Hi there!' },
    { promptQuestion: 'How are you?', botResponse: 'I am good, thanks for asking.' },
    { promptQuestion: 'What is your name?', botResponse: 'My name is Chatbot.' }
  ];

  it('returns an array with conversation and a function to update conversation', () => {
    const { result } = renderHook(() => useThreadedConversation(testResponse, 3));
    expect(result.current).toHaveLength(2);
    expect(Array.isArray(result.current[0])).toBeTruthy();
    expect(typeof result.current[1]).toBe('function');
  });

  it('formats the conversation correctly based on threadSize', () => {
    const { result } = renderHook(() => useThreadedConversation(testResponse, 2));
    expect(result.current[0]).toEqual([
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n'
    ]);
  });

  it('updates the conversation when the convoStore changes', () => {
    const { result, rerender } = renderHook(
      ({ chatResponse, threadSize }) => useThreadedConversation(chatResponse, threadSize),
      { initialProps: { chatResponse: testResponse, threadSize: 3 } }
    );

    expect(result.current[0]).toEqual([
      'Hello?\nHi there!\n',
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n'
    ]);

    const updatedChatResponse: ChatResponse[] = [
      { promptQuestion: 'How old are you?', botResponse: 'I am 5 years old.' },
    ];

    rerender({ chatResponse: updatedChatResponse, threadSize: 2 });

    expect(result.current[0]).toEqual([
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n',
    ]);
  });

  it('updates the conversation when the convoStore changes', () => {
    const { result, rerender } = renderHook(
      ({ chatResponse, threadSize }) => useThreadedConversation(chatResponse, threadSize),
      { initialProps: { chatResponse: testResponse, threadSize: 3 } }
    );

    expect(result.current[0]).toEqual([
      'Hello?\nHi there!\n',
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n'
    ]);

    const updatedChatResponse: ChatResponse[] = [
      { promptQuestion: 'How old are you?', botResponse: 'I am 5 years old.' },
      { promptQuestion: 'Where are you from?', botResponse: 'I am from Chatland.' }
    ];

    rerender({ chatResponse: updatedChatResponse, threadSize: 3 });

    expect(result.current[0]).toEqual([
      'Hello?\nHi there!\n',
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n',
    ]);
  });
});



describe('useChatResponse', () => {
  const localStorageKey = 'testKey';

  afterEach(() => {
    localStorage.clear();
  });

  it('should return an empty conversation array by default', () => {
    const { result } = renderHook(() => useLocalStorage(localStorageKey));

    expect(result.current[0]).toEqual([]);
  });

  it('should return the chatResponse array if it is provided', () => {
    const chatResponse: ChatResponse[] = [
      {
        botResponse: 'Hello',
        promptQuestion: 'How are you?',
        totalTokens: '10',
      },
    ];

    const { result } = renderHook(() => useLocalStorage(localStorageKey, chatResponse));

    expect(result.current[0]).toEqual(chatResponse);
  });

  it('should store the conversation array in localStorage', () => {
    const chatResponse: ChatResponse[] = [
      {
        botResponse: 'Hello',
        promptQuestion: 'How are you?',
        totalTokens: '10',
      },
    ];

    const { result } = renderHook(() => useLocalStorage(localStorageKey, chatResponse));

    expect(localStorage.getItem(localStorageKey)).toEqual(JSON.stringify(chatResponse));

    const newChatResponse: ChatResponse[] = [
      {
        botResponse: 'Goodbye',
        promptQuestion: 'See you later',
      },
    ];

    act(() => {
      result.current[1](newChatResponse);
    });

    expect(localStorage.getItem(localStorageKey)).toEqual(JSON.stringify(newChatResponse));
  });
});
