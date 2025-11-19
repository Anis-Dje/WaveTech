"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../store/auth";
import { API_ENDPOINTS } from "../../lib/api";

export default function Dashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    // For now, allow all authenticated users to access dashboard
    // You can add admin check later when you have the is_staff field
    // if (!user?.is_staff) {
    //   alert("Access denied. Admins only.");
    //   router.push("/");
    // }
  }, [user, token, isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Please login to access dashboard</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-blue-600 mb-10 text-center">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center border">
          <h2 className="text-3xl font-bold text-green-600 mb-2">127</h2>
          <p className="text-gray-600 text-lg">Total Orders</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center border">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">89</h2>
          <p className="text-gray-600 text-lg">Active Users</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center border">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">$12,847</h2>
          <p className="text-gray-600 text-lg">Revenue</p>
        </div>
      </div>

      <div className="text-center">
        <a
          href={API_ENDPOINTS.admin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Open Django Admin Panel
        </a>
      </div>

      {/* User Info Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          User Information
        </h3>
        <p className="text-lg mb-2">
          <strong>Welcome:</strong> {user.username}
        </p>
        <p className="text-lg mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Role:</strong> {user.is_staff ? "Admin" : "User"}
        </p>
      </div>
    </div>
  );
}
