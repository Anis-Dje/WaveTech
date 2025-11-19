"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../../lib/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_ENDPOINTS.auth.register, {
        username: username.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: password,
        re_password: confirmPassword, // Djoser expects 're_password' for confirmation
      });

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      console.log(err.response?.data);
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.username?.[0] ||
        "Registration failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-12 rounded-3xl shadow-2xl w-96"
      >
        <h2 className="text-4xl font-bold text-center mb-10 text-green-600">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-4 mb-6 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-600"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-6 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-600"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-600"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-4 mb-8 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-600"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
