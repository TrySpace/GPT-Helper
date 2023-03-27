This is a fork of: https://github.com/jas3333/GPT-Helper and is updated to work with `typescript`, uses `@mui` components and works on mobile.

## GPT Helper

This app is an interface to the GPT3 API. It isn't Chatgpt nor does it use the Chatgpt api.
I made it as a second option due to the amount of errors and issues Chatgpt was having.

In order to use it, you will need an Openai account and an API key.

### To install:

git clone the repo:

```
git clone https://github.com/TrySpace/GPT-Helper
cd GPT-Helper
npm install
```

### To run:

You will need to setup a .env file in the client directory. Make sure the file is named `.env` and nothing else.
`something.env` will not work.

```
REACT_APP_OPENAI_KEY=yourkey
```

Then run `npm start` inside the root directory. It should automatically open the page on port `3000`

### Personas

You can edit `./config/personas.ts`

### Customize

Change `mode` to `light` in `index.tsx` for light mode

## Todos

- ~Nicer loading~
- Better prompt insight
- ~Toggle dark/light theme~
- ~Make PromptController into sidebar~ or popover
- Remember last persona & model
- Local persona edit
- Tweak Response component layout?
- Fix build not resolving correct paths
