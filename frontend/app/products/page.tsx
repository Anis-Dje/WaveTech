"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { API_ENDPOINTS } from "../../lib/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.products.list)
      .then((res) => setProducts(res.data));
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
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[var(--wave-blue)] mb-10 text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap- gap-8">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div 
              className="cursor-pointer"
              onClick={() => router.push(`/products/${p.id}`)}
            >
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">{p.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-[var(--wave-blue)]">
                    ${p.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p.id);
                }}
                className="w-full bg-[var(--wave-blue)] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
