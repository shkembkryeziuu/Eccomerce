import { createContext, useState, useContext } from "react";
import { useLanguage } from "../../context/LanguageContext";

const Cartpage = createContext();

export function CartPage({ children }) {
  const [cart, setCart] = useState([]);
  const { t } = useLanguage();

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(t("addedToCart").replace("{{name}}", product.name));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    alert(t("orderPlaced"));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Cartpage.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </Cartpage.Provider>
  );
}

export function useCart() {
  return useContext(Cartpage);
}
