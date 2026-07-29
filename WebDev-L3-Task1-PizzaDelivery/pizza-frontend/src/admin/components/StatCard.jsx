function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-gray-500">
            {title}
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`text-5xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;