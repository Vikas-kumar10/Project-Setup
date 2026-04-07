import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Components
import HomePage from "./components/HomePage.jsx";
import ProductDetails from "./components/ProductDetailsPage";
import Cart from "./components/Cart.jsx";
import Navbar from "./components/Navbar";

// Admin Components
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AddProduct from "./Admin/AddProduct";
import ProductList from "./Admin/ProductList";
import EditProduct from "./Admin/EditProduct";

function App() {
  return (
    <BrowserRouter>

      {/* Hide Navbar on admin routes */}
      {!window.location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;