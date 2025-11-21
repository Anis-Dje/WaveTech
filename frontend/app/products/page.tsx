"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { API_ENDPOINTS } from "../../lib/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(API_ENDPOINTS.products.list)
      .then((res) => {
        console.log('Products fetched:', res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      })
      .finally(() => setLoading(false));
  }, []);

  const addToCart = async (productId: number) => {
    if (!token) return alert("Please login first");
    await axios.post(
      API_ENDPOINTS.cart.add,
      { product: productId, quantity: 1 },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--wave-blue)] mb-6 md:mb-10 text-center">
        Our Products
      </h1>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 font-semibold mb-2">Error loading products</p>
            <p className="text-sm text-red-500">{error}</p>
            <p className="text-xs text-gray-500 mt-2">API URL: {API_ENDPOINTS.products.list}</p>
          </div>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No products available</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div 
              className="cursor-pointer"
              onClick={() => router.push(`/products/${p.id}`)}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-gray-600 text-xs md:text-sm my-2 line-clamp-2">{p.description}</p>
                <div className="mt-3 md:mt-4">
                  <span className="text-xl md:text-2xl font-bold text-[var(--wave-blue)]">
                    ${p.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p.id);
                }}
                className="w-full bg-[var(--wave-blue)] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
