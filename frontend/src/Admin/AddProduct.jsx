import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit (API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      //  API call ho raha hai
      await axios.post("http://localhost:5000/api/products", {
        ...product,
        price: Number(product.price), 
      });

      alert("Product Added Successfully ");

      // reset form
      setProduct({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      // redirect
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Product
        </h1>

        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
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
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />

          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;