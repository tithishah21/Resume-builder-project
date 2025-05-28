import { create } from 'zustand';

interface ResumeState {
  name: string;
  setName: (name: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));
