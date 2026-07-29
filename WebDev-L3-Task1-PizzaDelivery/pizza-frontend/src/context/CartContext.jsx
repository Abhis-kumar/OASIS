import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add To Cart
  const addToCart = (pizzaData) => {
    const newItem = {
      pizza: pizzaData.pizza || pizzaData._id,

      name: pizzaData.name,
      image: pizzaData.image,

      base: pizzaData.base || null,
      sauce: pizzaData.sauce || null,
      cheese: pizzaData.cheese || null,

      baseName: pizzaData.baseName || "",
      sauceName: pizzaData.sauceName || "",
      cheeseName: pizzaData.cheeseName || "",

      vegetables: pizzaData.vegetables || [],
      vegetableNames: pizzaData.vegetableNames || [],

      // Price of ONE pizza only
      price: Number(pizzaData.price || 0),

      quantity: Number(pizzaData.quantity || 1),
    };

    const existingItem = cart.find((item) => {
      return (
        item.pizza === newItem.pizza &&
        item.base === newItem.base &&
        item.sauce === newItem.sauce &&
        item.cheese === newItem.cheese &&
        JSON.stringify(item.vegetables) ===
        JSON.stringify(newItem.vegetables)
      );
    });

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item === existingItem
            ? {
              ...item,
              quantity: item.quantity + newItem.quantity,
            }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, newItem]);
    }
  };

  // Remove Item
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Increase Quantity
  const increaseQuantity = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (index) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Total Items
  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  // Total Price
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);