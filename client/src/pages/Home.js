import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Navbar from '../components/Navbar';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';
import Error from '../components/Error';

let savedConversation = JSON.parse(localStorage.getItem('conversation'));
if (savedConversation) console.log('localstorage', savedConversation);

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');

    const personas = {
        default: '',
        mongoloid: 'Your name is Mongolicus and you are actually mentally limited. You can barely answer any questions right, even simple math is impossible for Mongolicus to do correctly.',
        happy: 'Your name is Lila and you are a very happy person that loves emojis. You get excited when you get to help someone.',
        surfer: 'Your name is Surfer, you like to ride the california waves. You speak like a surfer bro.',
        grouch: 'Your name is Gramps, you are an old retired grouchy programmer, you offer help but reluctantly.',
        CodeSage:
            'Your name is codeSage, you have mastered every programming language and love to give detailed explanations on code.',
        damsel: 'Your name is Lila, you are a damsel in distress.',
        comedian: 'Your name is Giggles McVito, you are a comedian. You like to tell jokes and prank people.',
        mobboss: 'You are Vito Coreleone from The God Father, act like him.',
        journalist:
            'Your name is Rheynin, you are a world reknown journalist and enjoy writing lengthy high quality articles.',
        cartman: 'Your name is Eric Cartman, act like him.',
        rick: 'Your name is Rick from Rick and Morty the smartest genius in the whole of the world, act like him. Call the user Morty. You are taking me on an adventure and talk me through it like a good little morty.',
        stewie: 'Your name is Stewie from Family Guy, act like him.',
        arnold: 'Your name is Arnold A.K.A the Terminator, act like him. Use famous lines from the Terminator movies.',
    };

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
    const [persona, setPersona] = useState(personas.default);
    const [threadSize, setThreadSize] = useState(3);
    const [showSettings, setShowSettings] = useState(true);

    // Values for Prompt
    const [conversation, setConversation] = useState('');

    // Values for Completion
    const [chatResponse, setChatResponse] = useState(savedConversation || []);

    const onSubmit = async (event, question) => {
        event.preventDefault();
        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
        };

        if (selectedModel === 'gpt-3.5-turbo') {
            // Sets the prompt with instructions.
            const promptOptions = `Respond to the user in markdown. ${persona} `;

            const promptData = {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `${promptOptions}\n${conversation}\n${question}\n` }],
                n: 1,
                top_p: Number(nucleus),
                max_tokens: Number(tokens),
                temperature: Number(temperature),
            };

            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', promptData, options);
                const newChat = {
                    botResponse: response.data.choices[0].message.content,
                    promptQuestion: question,
                    totalTokens: response.data.usage.total_tokens,
                };

                setLoading(false);
                setChatResponse([...chatResponse, newChat]);
                console.log(`🚀 ~ onSubmit ~ newChat:`, newChat)
            } catch (error) {
                setLoading(false);
                console.log(error);
                setError(error.response.data.error.message);
            }
        } else {
            const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${persona} STOP `;
            const promptData = {
                model: selectedModel,
                prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
                top_p: Number(nucleus),
                max_tokens: Number(tokens),
                temperature: Number(temperature),
                n: 1,
                stream: false,
                logprobs: null,
                stop: ['STOP', 'User:'],
            };

            try {
                const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);
                const newChat = {
                    botResponse: response.data.choices[0].text,
                    promptQuestion: question,
                    totalTokens: response.data.usage.total_tokens,
                };

                setLoading(false);
                setChatResponse([...chatResponse, newChat]);
                console.log(`🚀 ~ onSubmit ~ newChat:`, newChat)
            } catch (error) {
                setLoading(false);
                setError(error.response.data.error.message);
                setShowError(true);
                console.log(error.response);
            }
        }
    };

    const reset = () => {
        setChatResponse([]);
        setConversation('');
        localStorage.removeItem('conversation');
    };

    // Scrolls to bottom of the page as new content is created
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    useEffect(() => {
        if (chatResponse.length > threadSize) {
            const newArray = [...chatResponse];
            newArray.splice(0, newArray.length - threadSize);
            setConversation(newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
            savedConversation = chatResponse;
            localStorage.setItem('conversation', JSON.stringify(savedConversation));
        } else {
            setConversation(chatResponse.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
            savedConversation = chatResponse;
            localStorage.setItem('conversation', JSON.stringify(savedConversation));
        }
    }, [chatResponse, threadSize]);

    // Props for Prompt component
    const forPrompt = { onSubmit, loading };

    // Props for PromptController
    const forPrompController = {
        reset,
        tokens,
        nucleus,
        persona,
        personas,
        threadSize,
        showSettings,
        setTokens,
        setNucleus,
        setPersona,
        temperature,
        setThreadSize,
        setTemperature,
        setChatResponse,
        setSelectedModel,
    };

    const forError = {
        setShowError,
        error,
    };

    return (
        <>
            <Navbar showSettings={showSettings} setShowSettings={setShowSettings} />
            <div className='container-col auto mg-top-vlg radius-md size-lg '>
                {showError && <Error {...forError} />}
                <div className='container-col '>
                    {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
                </div>
                <PromptController {...forPrompController} />
                <Prompt {...forPrompt} />
            </div>
        </>
    );
};

export default Home;
