"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import interceptor from "../../utils/axiosInterceptor";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  const handleCheckout = async () => {
    router.push("/checkout");
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log(process.env.NEXT_PUBLIC_BASE_URL);
        const res = await interceptor.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/cart`
        );
        console.log(res.data);
        setCartItems(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartItems();
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = async (productId) => {
    try {
      console.log(productId);
      const res = await interceptor.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/cart?productId=${productId}`
      );

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== productId)
      );
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return subtotal.toFixed(2);
  };

  return (
    <div>
      {cartItems.length > 0 && (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center  rounded-xl p-4 bg-white shadow-md" // Added background and shadow
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}/${item.product.imageUrl}`}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain rounded-xl mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">${item.product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-200 px-2 py-1 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-200 px-2 py-1 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">
                    ${item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-red-500 mt-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4  pt-4 bg-white shadow-md rounded-xl p-4">
              {" "}
              {/* Added background, shadow, padding, and rounded corners */}
              <p className="text-lg font-semibold">
                Subtotal: ${calculateSubtotal()}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
