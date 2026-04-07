import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState([]);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {products.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          No Products Found
        </p>
      ) : (
        products.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl shadow hover:shadow-lg transition p-4"
          >
            
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded"
            />

            
            <h2 className="font-bold mt-2">{p.name}</h2>

            
            <p className="text-green-600">₹{p.price}</p>

            
            <Link to={`/product/${p._id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-2 rounded">
                View
              </button>
            </Link>
          </div>
        ))
      )}

    </div>
  );
}

export default HomePage;
