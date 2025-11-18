export default function Home() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-8">
        WaveTech
      </h1>
      <p className="text-3xl text-gray-700 mb-12 font-light">
        The future of technology, delivered today.
      </p>
      <a href="/products" className="btn-primary inline-block">
        Shop Now
      </a>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="card">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            Fast Delivery
          </h3>
          <p className="text-gray-600">Free shipping on orders over $50</p>
        </div>
        <div className="card">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            Premium Quality
          </h3>
          <p className="text-gray-600">Hand-picked tech products</p>
        </div>
        <div className="card">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            24/7 Support
          </h3>
          <p className="text-gray-600">We’re always here to help</p>
        </div>
      </div>
    </div>
  );
}
