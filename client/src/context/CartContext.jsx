import { useCallback, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../services/cartService";
import { CartContext } from "./cartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    const data = await getCart();
    return data.cart || { items: [] };
  }, []);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);

      setCart(await fetchCart());
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetchCart()
      .then(setCart)
      .catch((error) => {
        console.error("Failed to load cart:", error);
      });
  }, [fetchCart]);

  const addItem = async (productId, quantity = 1) => {
    const data = await addToCart(productId, quantity);

    setCart(data.cart || data);
  };

  const updateItem = async (productId, quantity) => {
    const data = await updateCart(productId, quantity);

    setCart(data.cart || { items: [] });
  };

  const removeItem = async (productId) => {
    const data = await removeFromCart(productId);

    setCart(data.cart || { items: [] });
  };

  const clearItems = async () => {
    await clearCart();
    setCart({ items: [] });
  };

  const itemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        loadCart,
        addItem,
        updateItem,
        removeItem,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};