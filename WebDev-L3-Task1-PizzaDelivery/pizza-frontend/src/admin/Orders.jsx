import { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders"); // ✅ Correct route

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, {
        orderStatus: status,
      }); // ✅ Correct route

      fetchOrders();
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-gray-500">
          No Orders Found
        </h2>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b text-center"
                >
                  <td className="p-3">
                    {order.deliveryDetails?.fullName}
                  </td>

                  <td className="p-3">
                    {order.deliveryDetails?.phone}
                  </td>

                  <td className="p-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-3">
                    {order.paymentMethod}
                  </td>

                  <td className="p-3">
                    {order.orderStatus}
                  </td>

                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded p-2"
                    >
                      <option value="Order Received">
                        Order Received
                      </option>
                      <option value="Preparing">
                        Preparing
                      </option>
                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;