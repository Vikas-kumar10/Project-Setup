import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-xl font-bold text-blue-600">MyStore</h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/cart" className="hover:text-blue-500">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;