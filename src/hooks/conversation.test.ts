import { renderHook } from '@testing-library/react-hooks'

import { ChatResponse, useThreadedConversation } from './conversation'

describe('useThreadedConversation', () => {
  const chatResponse = [
    { promptQuestion: 'Hello?', botResponse: 'Hi there!' },
    { promptQuestion: 'How are you?', botResponse: 'I am good, thanks for asking.' },
    { promptQuestion: 'What is your name?', botResponse: 'My name is Chatbot.' }
  ];

  it('returns an array with conversation and a function to update conversation', () => {
    const { result } = renderHook(() => useThreadedConversation(chatResponse, 3));
    expect(result.current).toHaveLength(2);
    expect(Array.isArray(result.current[0])).toBeTruthy();
    expect(typeof result.current[1]).toBe('function');
  });

  it('formats the conversation correctly based on threadSize', () => {
    const { result } = renderHook(() => useThreadedConversation(chatResponse, 2));
    expect(result.current[0]).toEqual([
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n'
    ]);
  });

  it('updates the conversation when the convoStore changes', () => {
    const { result, rerender } = renderHook(
      ({ chatResponse, threadSize }) => useThreadedConversation(chatResponse, threadSize),
      { initialProps: { chatResponse, threadSize: 3 } }
    );

    expect(result.current[0]).toEqual([
      'Hello?\nHi there!\n',
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n'
    ]);

    const updatedChatResponse = [
      { promptQuestion: 'How old are you?', botResponse: 'I am 5 years old.' },
      // { promptQuestion: 'Where are you from?', botResponse: 'I am from Chatland.' }
    ];

    rerender({ chatResponse: updatedChatResponse, threadSize: 2 });

    expect(result.current[0]).toEqual([
      'How are you?\nI am good, thanks for asking.\n',
      'What is your name?\nMy name is Chatbot.\n',
      // 'How old are you?\nI am 5 years old.\n',
      // 'Where are you from?\nI am from Chatland.\n'
    ]);
  });
});
