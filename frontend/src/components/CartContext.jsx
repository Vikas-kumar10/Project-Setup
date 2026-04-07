import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage (persist after refresh)
  const [cart, setCart] = useState(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  });

  //  Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        // Increase quantity if already exists
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      // Add new product with qty wiil start = 1
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  //  REMOVE FROM CART
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== id)
    );
  };

  //  UPDATE QUANTITY
  const updateQty = (id, qty) => {
    if (qty < 1) return; // prevent invalid qty

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  //  CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};