"use client";

import React, { Dispatch, SetStateAction } from "react";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: Dispatch<SetStateAction<string>>;
  onPasswordChange: Dispatch<SetStateAction<string>>;
  onLogin: () => void;
  loading?: boolean;
  errorMessage?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  loading = false,
  errorMessage,
}) => {
  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <input
        type="text"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        placeholder="Username"
        className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="Password"
        className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={onLogin}
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white ${
          loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700"
        } transition`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;
