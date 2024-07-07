import { useContext } from "react";
import { CartContext } from "./shopping_cart_context";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import Cart_camera from "./components/cart_camera";

const Cart = () => {
  const { cartCameraList } = useContext(CartContext);

  console.log("all", cartCameraList);

  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      <p>test cart</p>
      {cartCameraList !== null && cartCameraList.length > 0 ? (
        cartCameraList.map((camera) => {
          return <Cart_camera key={camera._id} camera={camera} />;
        })
      ) : (
        <p>Cart Empty</p>
      )}
    </>
  );
};

export default Cart;
