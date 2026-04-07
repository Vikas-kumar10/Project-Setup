import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch total products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setTotalProducts(res.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle Manage Click
  const handleManage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      if (res.data.length === 0) {
        alert("No products available ");
        return;
      }

      const firstProductId = res.data[0]._id;

      //   Route
      navigate(`/admin/edit/${firstProductId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/admin")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      
      <div className="mb-6">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">
            {totalProducts}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Add Product</h2>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Add Product
          </button>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">View Products</h2>
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
          >
            View Products
          </button>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Manage Products</h2>
          <button
            onClick={handleManage}   
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Manage Products
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;