import create from 'zustand/vanilla';

import { devtools } from 'zustand/middleware'

type PromptControllerStore = {
  temperature: number;
  tokens: number;
  nucleus: number;
  selectedModel: string;
  threadSize: number;
  setTemperature: (temp: number) => void;
  setTokens: (tokens: number) => void;
  setNucleus: (nucleus: number) => void;
  setSelectedModel: (model: string) => void;
  setThreadSize: (size: number) => void;
};

const usePromptControllerStore = create<PromptControllerStore>()(
  devtools(((set) => ({
    temperature: 0.5,
    tokens: 512,
    nucleus: 0.5,
    selectedModel: 'gpt-3.5-turbo',
    threadSize: 3,
    setTemperature: (temp) => set({ temperature: temp }),
    setTokens: (tokens) => set({ tokens }),
    setNucleus: (nucleus) => set({ nucleus }),
    setSelectedModel: (selectedModel) => set({ selectedModel }),
    setThreadSize: (size) => set({ threadSize: size }),
  })), {
    name: 'prompt-controller-store',
  }
  )
)

export default usePromptControllerStore;
