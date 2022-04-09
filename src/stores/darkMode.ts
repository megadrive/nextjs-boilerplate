// currently not used, but may be used in the future

import create from "zustand";

interface DarkModeState {
  dark: boolean;
}

export const darkModeStore = create<DarkModeState>((set) => ({
  dark: false,
  toggle: () => set((state) => ({ dark: !state.dark })),
  set: (dark: boolean) => set((state) => ({ dark })),
}));
