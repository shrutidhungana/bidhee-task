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
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  loading = false,
  errorMessage,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          Admin Login
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center font-medium">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <label className="text-gray-700 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Enter your username"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 text-gray-800 transition duration-300"
          />

          <label className="text-gray-700 font-medium mt-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 text-gray-800 transition duration-300"
          />
        </div>

        <div className="flex items-center justify-center  my-4">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div>

        <button
          onClick={onLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition duration-300 ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-lg"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
