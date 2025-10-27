"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

// Explicitly type mutation so TS knows isLoading exists
export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginInput,
  unknown
> => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ username, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
  });
};
