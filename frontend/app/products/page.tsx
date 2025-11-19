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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--wave-blue)] mb-6 md:mb-10 text-center">
        Our Products
      </h1>
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
    </div>
  );
}
