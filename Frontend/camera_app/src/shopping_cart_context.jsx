import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartCameraList, setCartCameraList] = useState(() => {
    const data = localStorage.getItem("cartCameraList");
    if (data === null) {
      return [];
    } else {
      console.log("not empty");
      return JSON.parse(data);
    }
  });

  useEffect(() => {
    localStorage.setItem("cartCameraList", JSON.stringify(cartCameraList));
  }, [cartCameraList]);

  const addToCart = (item) => {
    setCartCameraList([...cartCameraList, item]);
  };

  return (
    <CartContext.Provider value={{ cartCameraList, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
