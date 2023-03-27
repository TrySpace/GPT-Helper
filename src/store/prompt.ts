import create from 'zustand/vanilla';

import { devtools, persist } from 'zustand/middleware'
import { Persona, PERSONAS } from '../config/personas';

type PromptControllerState = {
  persona: Persona;
  temperature: number;
  tokens: number;
  nucleus: number;
  selectedModel: string;
  threadSize: number;
};

type PromptControllerActions = {
  setPersona: (persona: Persona) => void;
  setTemperature: (temp: number) => void;
  setTokens: (tokens: number) => void;
  setNucleus: (nucleus: number) => void;
  setSelectedModel: (model: string) => void;
  setThreadSize: (size: number) => void;
  resetPromptSettings: () => void
};

const defaults: PromptControllerState = {
  persona: 'Default',
  temperature: 0.5,
  tokens: 512,
  nucleus: 0.5,
  selectedModel: 'gpt-3.5-turbo',
  threadSize: 3,
}

const usePromptControllerStore = create<PromptControllerState & PromptControllerActions>()(
  devtools(
    persist(((set) => ({
      persona: defaults.persona,
      temperature: defaults.temperature,
      tokens: defaults.tokens,
      nucleus: defaults.nucleus,
      selectedModel: defaults.selectedModel,
      threadSize: defaults.threadSize,
      setPersona: (persona) => set({ persona }),
      setTemperature: (temp) => set({ temperature: temp }),
      setTokens: (tokens) => set({ tokens }),
      setNucleus: (nucleus) => set({ nucleus }),
      setSelectedModel: (selectedModel) => set({ selectedModel }),
      setThreadSize: (size) => set({ threadSize: size }),
      resetPromptSettings: () => set({
        ...defaults
      }),
    })), {
      name: 'prompt-controller-store',
    }
    )
  )
)

export default usePromptControllerStore;
