import { useContext ,} from "react";
import { CartContext } from "../components/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.map(item => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-center gap-4 border-b py-4"
        >
          
          <img
            src={item.image}
            alt={item.name}
            className="h-24 w-24 object-cover rounded-lg shadow"
          />

          
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-green-600 font-bold">₹{item.price}</p>
          </div>

          {/* Quantity show hoga jo ki min quantity 1 hoga */}

          <div className="flex items-center gap-2">
            <label className="text-gray-700">Qty:</label>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={e => updateQty(item._id, Number(e.target.value))}
              className="border w-16 text-center rounded"
            />
          </div>

          
          <button
            onClick={() => removeFromCart(item._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Remove
          </button>
        </div>
      ))}

      
      <div className="flex justify-end mt-6 text-2xl font-bold">
        Total: ₹{total}
      </div>
    </div>
  );
}

export default Cart;