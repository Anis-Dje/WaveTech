"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../../lib/api";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image_url?: string;
  };
  quantity: number;
  created_at: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<{ [key: number]: boolean }>({});
  const { token, user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    loadCart();
  }, [authLoading, isAuthenticated, token, router]);

  const loadCart = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.cart.list, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (error: any) {
      console.error("Cart API error:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      } else {
        alert("Failed to load cart");
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

    loadCart();
  }, [token, isAuthenticated, authLoading, router, user]);

  // Show loading while auth is initializing
  if (authLoading) {
    return <div className="text-center py-20 text-xl">Initializing...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated || !token) {
    return (
      <div className="text-center py-20 text-xl">Redirecting to login...</div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading cart...</div>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product_price,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-blue-600 mb-10 text-center">
        Your Cart
      </h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p>
          <strong>Debug:</strong> Authenticated:{" "}
          {isAuthenticated ? "Yes" : "No"}, User: {user?.username}, Items:{" "}
          {cartItems.length}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-2xl text-gray-500">
          Your cart is empty.{" "}
          <a href="/products" className="text-blue-600 underline">
            Shop now
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-lg flex justify-between items-center border"
            >
              <div>
                <h3 className="text-2xl font-bold">{item.product_name}</h3>
                <p className="text-gray-600">
                  Quantity: {item.quantity} × ${item.product_price}
                </p>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                ${(item.quantity * item.product_price).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="text-right mt-10">
            <p className="text-3xl font-bold mb-6">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </p>
            <button
              onClick={async () => {
                try {
                  await axios.post(
                    API_ENDPOINTS.orders.create,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  alert("Order placed successfully!");
                  setCartItems([]);
                } catch (error) {
                  alert("Order failed");
                }
              }}
              className="bg-blue-600 text-white px-12 py-5 rounded-full text-xl hover:bg-blue-700 transition"
            >
              Place Order (Free Checkout)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
