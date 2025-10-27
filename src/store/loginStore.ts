"use client";

import { create } from "zustand";

interface LoginState {
  isLoggedIn: boolean;
  error?: string;
  setLogin: (val: boolean) => void;
  setError: (err?: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  isLoggedIn: false,
  error: undefined,
  setLogin: (val) => set({ isLoggedIn: val }),
  setError: (err) => set({ error: err }),
}));
