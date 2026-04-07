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

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch SINGLE product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Product not found ");
        // navigate("/admin/products");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE Product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          ...product,
          price: Number(product.price),
        }
      );

      alert("Product Updated Successfully ");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Update Failed ");
    } finally {
      setLoading(false);
    }
  };

  //  DELETE Product
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted Successfully ");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Delete Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Loading UI while fetching
  if (fetching) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">Loading product...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Product
        </h1>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">

          
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          
          {product.image && (
            <img
              src={product.image}
              alt="preview"
              className="h-40 object-cover rounded-lg"
            />
          )}

          
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />

          
          <div className="flex gap-4">
            
            {/* Update */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold w-full"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold w-full"
            >
              {loading ? "Deleting..." : "Delete Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;