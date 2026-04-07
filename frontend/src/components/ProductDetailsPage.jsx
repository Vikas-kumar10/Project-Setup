import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // yaha hum Fetch single product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  //  Loading state
  if (!product) return <h1 className="p-6">Loading...</h1>;

  //  Add to cart + redirect both perform honge
  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8 mt-7 ml-2.5">
      
      
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      
      <div className="flex-1 flex flex-col py-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>

        <p className="text-gray-600 text-base mb-4">
          {product.description}
        </p>

        <p className="text-2xl font-semibold text-green-600 mb-6">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition duration-200 w-40"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;