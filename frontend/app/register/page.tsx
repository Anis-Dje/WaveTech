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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await axios.post(API_ENDPOINTS.auth.register, {
        email: email.toLowerCase().trim(),
        username: username.toLowerCase().trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        password: password,
        re_password: confirmPassword,
      });
      alert("Registration successful! Please check your email and login.");
      router.push("/login");
    } catch (err: any) {
      console.log(err.response?.data);
      const backendErrors = err.response?.data;
      if (backendErrors) {
        setErrors(backendErrors);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-green-600">
          Create Account
        </h2>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 ${
                  errors.firstName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 ${
                  errors.lastName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 pr-12 ${
                  errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full p-4 border rounded-xl text-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-600'
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
