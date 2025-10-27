"use client";

import React, { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { useLoginStore } from "@/store/loginStore";

export default function AdminLoginPage() {
  const [username, setUsername] = useState(
    process.env.NEXT_PUBLIC_ADMIN_USERNAME || ""
  );
  const [password, setPassword] = useState(
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ""
  );

  const loginMutation = useLogin();
  const setLogin = useLoginStore((state) => state.setLogin);
  const setError = useLoginStore((state) => state.setError);
  const error = useLoginStore((state) => state.error);

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({ username, password });
      setLogin(true);
      setError(undefined);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <LoginForm
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      loading={loginMutation.isLoading} 
      errorMessage={error}
    />
  );
}
