import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //  Fetch products from backend
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
    <div className="min-h-screen bg-gray-100 p-6">
      
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product List</h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">View</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-t">
                  
                  
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>

                  
                  <td className="p-3 font-semibold">{p.name}</td>

                  
                  <td className="p-3 text-green-600">₹{p.price}</td>

                  
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/product/${p._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ProductList;