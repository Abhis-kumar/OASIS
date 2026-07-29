import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderApi";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      console.log(res);
      setOrders(res.orders || []);
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, {
        orderStatus: status,
      });

      fetchOrders();
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">

      <h1 className="text-3xl font-bold mb-6">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No Orders Found
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead className="bg-gray-100">

              <tr>
                <th className="border p-3">Order ID</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Total</th>
                <th className="border p-3">Payment</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Update Status</th>
              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  <td className="border p-3">
                    {order._id.slice(-6)}
                  </td>

                  <td className="border p-3">
                    {order.user?.name || "N/A"}
                  </td>

                  <td className="border p-3">
                    {order.user?.email || "N/A"}
                  </td>

                  <td className="border p-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="border p-3">
                    {order.paymentMethod}
                  </td>

                  <td className="border p-3">
                    <span className="font-semibold">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="border p-3">

                    <select
                      className="border rounded p-2"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
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
}

export default ManageOrders;