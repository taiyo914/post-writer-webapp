"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSignUpSuccess(true);
    }

    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 opacity-75">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <h1 className="text-2xl font-bold ">ログイン</h1>
      <p className="text-gray-400">or</p>
      <h1 className="text-2xl font-bold mb-4">新規アカウント作成</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 border rounded w-80"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 p-2 border rounded w-80"
      />
      <div className="flex flex-col space-y-4 mt-6 w-80">
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:opacity-80 transition"
        >
          新規アカウント作成
        </button>
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="bg-gray-600 text-white py-2 rounded hover:opacity-80 transition"
        >
          ログイン
        </button>
      </div>
      {signUpSuccess && (
        <p className="text-green-500 mt-4">
          新規アカウントが作成されました。確認メールをご確認ください。
        </p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
