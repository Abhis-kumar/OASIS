import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderApi";
import OrderTracker from "../components/orders/OrderTracker";
import socket from "../socket";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.orders);

      // Join room after orders load
      if (res.orders.length > 0) {
        socket.emit("join", res.orders[0].user);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchOrders();

    socket.on("order-status-updated", (data) => {

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.orderId
            ? { ...order, orderStatus: data.status }
            : order
        )
      );

      alert(`Order Status Updated: ${data.status}`);

    });

    return () => {
      socket.off("order-status-updated");
    };

  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            No Orders Yet
          </h2>
        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-xl">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-red-600">
                    ₹{order.totalAmount}
                  </p>

                  <p>{order.paymentMethod}</p>

                </div>

              </div>

              <hr className="my-5" />

              <div className="flex justify-between">

                <div>

                  <OrderTracker status={order.orderStatus} />

                  <p className="mt-2">
                    <strong>Payment:</strong>{" "}
                    {order.paymentStatus}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;