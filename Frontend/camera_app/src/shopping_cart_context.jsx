import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartCameraList, setCartCameraList] = useState(() => {
    const data = localStorage.getItem("cartCameraList");
    if (data === null) {
      return [];
    } else {
      //console.log("not empty");
      return JSON.parse(data);
    }
  });

  useEffect(() => {
    localStorage.setItem("cartCameraList", JSON.stringify(cartCameraList));
  }, [cartCameraList]);

  const addToCart = (item) => {
    const cameraList = JSON.parse(localStorage.getItem("cartCameraList"));
    if (cameraList[0] !== undefined) {
      for (let i = 0; i <= cameraList.length - 1; i++) {
        if (cameraList[i]._id === item._id) {
          return;
        }
      }
    }
    setCartCameraList([...cartCameraList, item]);
  };

  const deleteFromCart = (id) => {
    const cameraList = JSON.parse(localStorage.getItem("cartCameraList"));
    console.log("delete");
    console.log("id", id);
    const newCameraList = cameraList.filter((camera) => camera._id !== id);
    console.log("newlist", newCameraList);
    localStorage.setItem("cartCameraList", JSON.stringify(newCameraList));
    setCartCameraList(newCameraList);
  };

  return (
    <CartContext.Provider value={{ cartCameraList, addToCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
