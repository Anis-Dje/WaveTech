// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: "WaveTech",
  description: "Modern Tech Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <AuthProvider>
          <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">WaveTech</h1>
              <nav className="flex gap-8">
                <a href="/" className="hover:underline">
                  Home
                </a>
                <a href="/products" className="hover:underline">
                  Products
                </a>
                <a href="/cart" className="hover:underline">
                  Cart
                </a>
                <a href="/profile" className="hover:underline">
                  Profile
                </a>
                <a href="/dashboard" className="hover:underline">
                  Dashboard
                </a>
                <a href="/login" className="hover:underline">
                  Login
                </a>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-900 text-white text-center py-8 mt-20">
            © 2025 WaveTech — All rights reserved
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
