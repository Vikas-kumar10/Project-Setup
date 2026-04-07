import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Add Product */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">Add Product</h2>
          <p className="text-gray-600 mb-4">
            Add new products to your store.
          </p>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* View Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">View Products</h2>
          <p className="text-gray-600 mb-4">
            See all products and manage them.
          </p>
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            View
          </button>
        </div>

        {/* Edit Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-3">Edit Products</h2>
          <p className="text-gray-600 mb-4">
            Update or delete existing products.
          </p>
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Manage
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;