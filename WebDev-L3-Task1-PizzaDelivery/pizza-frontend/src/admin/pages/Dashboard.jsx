import { useEffect, useState } from "react";
import {
  FaUsers,
  FaPizzaSlice,
  FaShoppingBag,
  FaBoxes,
  FaExclamationTriangle,
  FaTruck,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import DashboardCharts from "../components/DashboardCharts";
import RecentOrders from "../components/RecentOrders";

import { getDashboard } from "../../services/adminApi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.dashboard);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Main Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Users"
          value={dashboard.totalUsers}
          icon={<FaUsers />}
          color="text-blue-600"
        />

        <StatCard
          title="Pizzas"
          value={dashboard.totalPizzas}
          icon={<FaPizzaSlice />}
          color="text-red-600"
        />

        <StatCard
          title="Orders"
          value={dashboard.totalOrders}
          icon={<FaShoppingBag />}
          color="text-green-600"
        />

        <StatCard
          title="Inventory"
          value={dashboard.totalInventoryItems}
          icon={<FaBoxes />}
          color="text-yellow-600"
        />

      </div>

      {/* Secondary Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Pending Orders"
          value={dashboard.pendingOrders}
          icon={<FaShoppingBag />}
          color="text-orange-500"
        />

        <StatCard
          title="Preparing Orders"
          value={dashboard.preparingOrders}
          icon={<FaTruck />}
          color="text-purple-600"
        />

        <StatCard
          title="Low Stock"
          value={dashboard.lowStockItems}
          icon={<FaExclamationTriangle />}
          color="text-red-500"
        />

      </div>

      {/* Charts */}

      <DashboardCharts
        salesByMonth={dashboard.salesByMonth || []}
        ordersByStatus={dashboard.ordersByStatus || []}
      />

      {/* Recent Orders */}

      <RecentOrders />

    </div>
  );
}

export default Dashboard;