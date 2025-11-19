"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

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
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-gray-600 text-sm my-2">{p.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-[var(--wave-blue)]">
                  ${p.price}
                </span>
                <button
                  onClick={() => addToCart(p.id)}
                  className="bg-[var(--wave-blue)] text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
