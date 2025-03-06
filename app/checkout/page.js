"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import interceptor from "../../utils/axiosInterceptor";

const CheckoutPage = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const res = await interceptor.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/checkout`
        );
        console.log("qwerty", res.data);
        setCheckoutData(res.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  console.log(checkoutData);

  if (!checkoutData) return <div></div>;

  const { user, cart } = checkoutData;

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.99;
  const tax = (Number(subtotal) * 0.1).toFixed(2);
  const total = (Number(subtotal) + shipping + Number(tax)).toFixed(2);

  return (
    <div className="bg-gray-100 min-h-screen overflow-y-hidden py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping and Payment Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name:
                </label>
                <p>
                  {user.fname} {user.lname}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address:
                </label>
                <p>
                  {user.address}, {user.city}, {user.state} {user.zipCode},{" "}
                  {user.country}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Payment Information</h2>

            <form>
              <div class="mb-4">
                <label
                  for="card-number"
                  class="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>

              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    for="expiration-date"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expiration-date"
                    placeholder="MM/YY"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    for="cvv"
                    class="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.product._id} className="py-6 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE}/${item.product.imageUrl}`}
                      width={96}
                      height={96}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.product.name}</h3>
                        <p className="ml-4">${item.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Shipping</p>
              <p>${shipping}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Tax</p>
              <p>${tax}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                try {
                  const res = await interceptor.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/users/placeorder`
                  );
                  console.log("Order placed:", res.data);
                  alert("Order placed successfully!");
                  window.location.href = "/cart";
                } catch (error) {
                  console.error("Error placing order:", error);
                  // Handle error appropriately
                }
              }}
              className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
