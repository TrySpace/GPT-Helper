# GPT Prompt Engineer

This is a fork of [jas3333/GPT-Helper](https://github.com/jas3333/GPT-Helper) that has been updated to work with `typescript` and uses `@mui` material design components, making it mobile-friendly.

The application uses `zustand` for state management and local storage, `axios` for openAI requests, and `react-syntax-highlighter` & `react-syntax-markdown` to format the GPT responses. The modifications are primarily made using GPT/ChatGP, including this readme.

## Warning!

This app is an _interface to the GPT API_. It is **not** ChatGPT **nor** does it use the ChatGPT API.
It is created as a backup alternative to ChatGPT, which can sometimes be overloaded.

## Tech Stack

- Typescript
- @mui/material
- Zustand
- Axios
- react-syntax-highlighter & react-syntax-markdown

## Usage

This app allows you to automatically prefix questions with your own personas/prompts using prompt-engineering techniques. Please note that this is **not** ChatGPT and won't work the same. You should reset the prompt when asking different questions, as it is not very good at maintaining a threaded conversation.

It's important to note that each additional question depending on the thread length setting will increase the token cost, so resetting often is recommended.

> Each additional question depending on the thread length setting will increase the token cost! So reset often!

### How to use

- Automatically prefix questions with your own personas/prompts
- Prompt-engineering
- ?
- Profit

### Installation

Before getting started, you will need an OpenAI account and an API key. Once you have these, you can clone the repository:

```bash
git clone https://github.com/TrySpace/GPT-Helper
cd GPT-Helper
npm install
```

### Running the App

To run the app, you will need to set up a file called `.env` the root directory.

```bash
REACT_APP_OPENAI_KEY=yourkey
```

Then run `npm start`, it should automatically open the page on port `3000`

## Configuring Personas

You can edit `./config/personas.ts`

### Todos

- ~Nicer loading~
- ~Toggle dark/light theme~
- ~Make PromptController into sidebar~ or popover
- ~Remember last persona & model~
- ~Fix Chat overflow~
- Better prompt insight; Popover to see the full prefix, and for each message show the complete question.
- Click button to copy raw response text to clipboard
- Updating 1 Question and see the diff of the Answer
- Local persona edit
- Store history in localStore, move current convo before resetting
- Tweak Response component layout?
- Update to GPT 4?
- Fix build not resolving correct paths
