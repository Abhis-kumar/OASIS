import { useEffect, useState } from "react";
import { getRecentOrders } from "../../services/adminApi";

function RecentOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const res = await getRecentOrders();

      setOrders(res.orders);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="bg-white rounded-xl shadow mt-8 p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Orders

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Customer</th>

              <th className="text-left">Amount</th>

              <th className="text-left">Payment</th>

              <th className="text-left">Status</th>

              <th className="text-left">Date</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b"
              >

                <td className="py-4">

                  {order.user?.name}

                </td>

                <td>

                  ₹{order.totalAmount}

                </td>

                <td>

                  {order.paymentMethod}

                </td>

                <td>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                    {order.orderStatus}

                  </span>

                </td>

                <td>

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default RecentOrders;