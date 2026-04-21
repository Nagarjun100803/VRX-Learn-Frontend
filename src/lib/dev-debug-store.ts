import { create } from "zustand";

export type DebugLog = {
  id: string;
  request: {
    method: string;
    url: string;
    params?: any;
    data?: any;
  };
  response?: {
    status: number;
    data: any;
  };
  error?: {
    type: string;
    message: string;
    raw: any;
  };
  timestamp: string;
};

interface DebugStore {
  logs: DebugLog[];
  addLog: (log: DebugLog) => void;
  clearLogs: () => void;
}

export const useDebugStore = create<DebugStore>((set) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs].slice(0, 20), // Max 20 logs
    })),
  clearLogs: () => set({ logs: [] }),
}));
