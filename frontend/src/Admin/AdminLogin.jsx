import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (username === "admin" && password === "12345") {
      alert("Login Successful");
      navigate("/admin/dashboard"); // redirect
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h1>

        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            
          />

          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Use for Admin */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Use by: <span className="font-bold">admin</span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;