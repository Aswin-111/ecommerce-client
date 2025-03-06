"use client";
import { useState, useEffect } from "react";

import interceptor from "../../utils/axiosInterceptor";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend API
    const fetchOrders = async () => {
      try {
        const response = await interceptor.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/orders`
        );
        const data = response.data;

        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Order ID
            </th>

            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Products
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Total
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {order.orderId}
              </td>

              <td className="flex justify-center items-center py-2 ">
                <button className="px-5 py-2 bg-gray-800  text-white rounded-lg">
                  View details
                </button>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {order.total}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(order.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
