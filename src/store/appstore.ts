import { PaletteMode } from '@mui/material';
import create from 'zustand';

import { devtools } from 'zustand/middleware'

interface AppStore {
  theme: PaletteMode;
  loading: boolean;
  settingsOpen: boolean;
  setTheme: (mode: PaletteMode) => void;
  setLoading: (loading: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    ((set) => ({
      theme: 'dark',
      loading: false,
      settingsOpen: false,
      setTheme: (theme: PaletteMode) => set({ theme }, false, 'setTheme'),
      setLoading: (loading: boolean) => set({ loading }, false, 'setLoading'),
      setSettingsOpen: (open: boolean) => set({ settingsOpen: open }, false, 'setSettingsOpen'),
    })),
    {
      name: 'gpt-app-store',
    }
  )
)

export default useAppStore;
