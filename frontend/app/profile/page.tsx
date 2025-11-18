"use client";
import { useAuth } from "../../store/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return <div className="text-center py-20">Login required</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-[var(--wave-blue)] mb-8">
          My Profile
        </h1>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.is_staff ? "Admin" : "Customer"}
        </p>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="mt-8 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
