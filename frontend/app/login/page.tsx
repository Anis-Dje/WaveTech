"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../store/auth";
import { API_ENDPOINTS } from "../../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        API_ENDPOINTS.auth.login,
        {
          username: email.toLowerCase().trim(),
          password: password,
        }
      );

      // Store refresh token in localStorage
      localStorage.setItem("refresh_token", res.data.refresh);

      // fetch full user profile and then store token + user
      const me = await axios.get(API_ENDPOINTS.auth.me, {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });

      // Only pass 2 parameters as expected by the auth store
      login(res.data.access, me.data);
      alert("Welcome back!");
      router.push("/products");
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Wrong email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-12 rounded-3xl shadow-2xl w-96"
      >
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-6 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-blue-600"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-8 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-blue-600"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login with Email"}
        </button>
      </form>
    </div>
  );
}
