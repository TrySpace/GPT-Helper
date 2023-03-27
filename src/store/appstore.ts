import { PaletteMode } from '@mui/material';
import create from 'zustand';

interface AppStore {
  theme: PaletteMode;
  loading: boolean;
  settingsOpen: boolean;
  setTheme: (mode: PaletteMode) => void;
  setLoading: (loading: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'dark',
  loading: false,
  settingsOpen: false,
  setTheme: (theme: PaletteMode) => set({ theme }),
  setLoading: (loading: boolean) => set({ loading }),
  setSettingsOpen: (open: boolean) => set({ settingsOpen: open }),
}));

export default useAppStore;
