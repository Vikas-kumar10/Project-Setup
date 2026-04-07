import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  // ✅ Fetch single product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const foundProduct = res.data.find((p) => p._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Update Product (API)
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );

      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ✅ Delete Product (API)
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      alert("Product Deleted Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Product
        </h1>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Image */}
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Preview Image */}
          {product.image && (
            <img
              src={product.image}
              alt="preview"
              className="h-40 object-cover rounded-lg"
            />
          )}

          {/* Description */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition w-full"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition w-full"
            >
              Delete Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;