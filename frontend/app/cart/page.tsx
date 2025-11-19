"use client";

import { useEffect, useState, useCallback } from "react";
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

  const loadCart = useCallback(async () => {
    if (!token) return;
    
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
  }, [token, router]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    loadCart();
  }, [authLoading, isAuthenticated, token, router, loadCart]);

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdating(prev => ({ ...prev, [itemId]: true }));
    try {
      await axios.patch(
        `${API_ENDPOINTS.cart.list}${itemId}/`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    } finally {
      setUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const removeItem = async (itemId: number) => {
    if (!confirm("Remove this item from your cart?")) return;
    
    setUpdating(prev => ({ ...prev, [itemId]: true }));
    try {
      await axios.delete(`${API_ENDPOINTS.cart.list}${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error: any) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    } finally {
      setUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const clearCart = async () => {
    if (!confirm("Clear all items from your cart?")) return;
    
    setLoading(true);
    try {
      await Promise.all(
        cartItems.map(item => 
          axios.delete(`${API_ENDPOINTS.cart.list}${item.id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );
      setCartItems([]);
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shipping + tax).toFixed(2),
    };
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading cart...</div>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {item.product.image_url ? (
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{item.product.description}</p>
                      <p className="text-2xl font-bold text-blue-600">${item.product.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updating[item.id]}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                            {updating[item.id] ? "..." : item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={updating[item.id]}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={updating[item.id]}
                          className="text-red-600 hover:text-red-700 p-2 disabled:opacity-50"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {parseFloat(totals.shipping) === 0 ? "Free" : `$${totals.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${totals.tax}</span>
                  </div>
                  {parseFloat(totals.subtotal) < 100 && (
                    <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                      Add ${(100 - parseFloat(totals.subtotal)).toFixed(2)} more for free shipping!
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${totals.total}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={() => router.push("/products")}
                    className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}