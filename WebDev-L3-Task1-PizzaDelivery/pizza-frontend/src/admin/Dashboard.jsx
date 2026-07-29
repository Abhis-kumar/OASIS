import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPizzaSlice,
  FaClipboardList,
  FaUsers,
  FaBoxes,
  FaChartLine,
} from "react-icons/fa";
import api from ".././services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalPizzas: 0,
    totalInventory: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [orders, pizzas, inventory, users] = await Promise.all([
        api.get("/orders"),
        api.get("/pizzas"),
        api.get("/inventory"),
        api.get("/users"),
      ]);

      setStats({
        totalOrders: orders.data.orders?.length || 0,
        totalPizzas: pizzas.data.pizzas?.length || 0,
        totalInventory: inventory.data.inventory?.length || 0,
        totalUsers: users.data.users?.length || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaClipboardList className="text-3xl text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Total Pizzas",
      value: stats.totalPizzas,
      icon: <FaPizzaSlice className="text-3xl text-red-600" />,
      color: "bg-red-100",
    },
    {
      title: "Inventory Items",
      value: stats.totalInventory,
      icon: <FaBoxes className="text-3xl text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FaUsers className="text-3xl text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-gray-500">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">
                {card.value}
              </p>
            </div>

            <div className={`${card.color} p-4 rounded-full`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/admin/orders"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <FaClipboardList className="text-4xl text-blue-600 mb-3" />
          <h3 className="text-xl font-bold">Manage Orders</h3>
          <p className="text-gray-500 mt-2">
            View and update customer orders.
          </p>
        </Link>

        <Link
          to="/admin/pizzas"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <FaPizzaSlice className="text-4xl text-red-600 mb-3" />
          <h3 className="text-xl font-bold">Manage Pizzas</h3>
          <p className="text-gray-500 mt-2">
            Add, edit and remove pizzas.
          </p>
        </Link>

        <Link
          to="/admin/inventory"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <FaBoxes className="text-4xl text-green-600 mb-3" />
          <h3 className="text-xl font-bold">Inventory</h3>
          <p className="text-gray-500 mt-2">
            Manage ingredients and stock.
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <FaUsers className="text-4xl text-purple-600 mb-3" />
          <h3 className="text-xl font-bold">Users</h3>
          <p className="text-gray-500 mt-2">
            View registered users.
          </p>
        </Link>

        <Link
          to="/admin/analytics"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <FaChartLine className="text-4xl text-orange-600 mb-3" />
          <h3 className="text-xl font-bold">Analytics</h3>
          <p className="text-gray-500 mt-2">
            Sales reports and statistics.
          </p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;