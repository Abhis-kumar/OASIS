import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaUsers,
  FaPizzaSlice,
  FaClipboardList,
  FaRupeeSign,
} from "react-icons/fa";

const Analytics = () => {
  const [stats, setStats] = useState({
    users: 0,
    pizzas: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      console.log(res.data);

      if (res.data.success) {
        const data = res.data.dashboard;

        setStats({
          users: data.totalUsers,
          pizzas: data.totalPizzas,
          orders: data.totalOrders,
          revenue: 0, // we'll calculate later
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers className="text-3xl" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Pizzas",
      value: stats.pizzas,
      icon: <FaPizzaSlice className="text-3xl" />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FaClipboardList className="text-3xl" />,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <FaRupeeSign className="text-3xl" />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-xl shadow-lg p-6`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              {card.icon}
            </div>
          </div>
        ))}

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-4">
          Business Summary
        </h2>

        <div className="space-y-3 text-lg">

          <p>
            👥 Registered Users :
            <span className="font-bold ml-2">
              {stats.users}
            </span>
          </p>

          <p>
            🍕 Available Pizzas :
            <span className="font-bold ml-2">
              {stats.pizzas}
            </span>
          </p>

          <p>
            📦 Orders Received :
            <span className="font-bold ml-2">
              {stats.orders}
            </span>
          </p>

          <p>
            💰 Total Revenue :
            <span className="font-bold ml-2 text-green-600">
              ₹{stats.revenue}
            </span>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Analytics;