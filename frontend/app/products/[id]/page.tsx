"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../../store/auth";
import { API_ENDPOINTS } from "../../../lib/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock_quantity: number;
  image?: string;
  created_at: string;
}

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.products.list}${params.id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  const addToCart = async () => {
    if (!user || !token) {
      alert("Please login to add items to cart");
      router.push("/login");
      return;
    }

    setAddingToCart(true);
    try {
      await axios.post(
        API_ENDPOINTS.cart.add,
        { 
          product: product?.id, 
          quantity: quantity 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${quantity} ${product?.name}(s) added to cart!`);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        alert("Please login again");
        router.push("/login");
      } else {
        alert("Failed to add to cart");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-4">Product not found</div>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push("/products")}
          className="mb-4 md:mb-8 text-blue-600 hover:text-blue-800 flex items-center gap-2 transition"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm md:text-base">Back to Products</span>
        </button>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Product Image */}
            <div className="p-4 md:p-8">
              <div className="aspect-square bg-gray-100 rounded-lg md:rounded-xl flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No image available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 md:p-8">
              <div className="mb-3 md:mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{product.name}</h1>
              
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6">${product.price}</div>

              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-4 md:mb-6">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <span className="text-xs md:text-sm font-medium text-gray-700">Stock:</span>
                  <span className={`text-xs md:text-sm font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                  </span>
                </div>

                {product.stock_quantity > 0 && (
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <label className="text-xs md:text-sm font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 md:px-3 py-1 md:py-2 text-gray-600 hover:text-gray-800 transition text-sm md:text-base"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 md:px-4 py-1 md:py-2 border-x border-gray-300 text-sm md:text-base">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                        className="px-2 md:px-3 py-1 md:py-2 text-gray-600 hover:text-gray-800 transition text-sm md:text-base"
                        disabled={quantity >= product.stock_quantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 md:space-y-4">
                <button
                  onClick={addToCart}
                  disabled={product.stock_quantity === 0 || addingToCart}
                  className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg transition ${
                    product.stock_quantity === 0 || addingToCart
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {addingToCart ? 'Adding to Cart...' : 
                   product.stock_quantity === 0 ? 'Out of Stock' : 
                   `Add ${quantity} to Cart`}
                </button>

                <button
                  onClick={() => router.push("/cart")}
                  className="w-full py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  View Cart
                </button>
              </div>

              {/* Product Details */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Product Details</h3>
                <div className="space-y-2 text-xs md:text-sm text-gray-600">
                  <div>Product ID: {product.id}</div>
                  <div>Added: {new Date(product.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}