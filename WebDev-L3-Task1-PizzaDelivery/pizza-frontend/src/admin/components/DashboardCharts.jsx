import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
];

function DashboardCharts({
  salesByMonth = [],
  ordersByStatus = [],
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      {/* Sales Chart */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Monthly Sales
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={salesByMonth}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ef4444"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Order Status */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Orders Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={ordersByStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
            >

              {ordersByStatus.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;