import {
  FaHome,
  FaPizzaSlice,
  FaBoxes,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin",
    },
    {
      name: "Pizzas",
      icon: <FaPizzaSlice />,
      path: "/admin/pizzas",
    },
    {
      name: "Inventory",
      icon: <FaBoxes />,
      path: "/admin/inventory",
    },
    {
      name: "Orders",
      icon: <FaShoppingBag />,
      path: "/admin/orders",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white">

      <div className="text-3xl font-bold text-center py-8 border-b border-gray-700">
        🍕 PizzaHub
      </div>

      <div className="mt-6">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 hover:bg-red-600 transition ${
                isActive ? "bg-red-600" : ""
              }`
            }
          >
            {menu.icon}

            {menu.name}
          </NavLink>
        ))}

      </div>

      <button className="flex items-center gap-4 px-6 py-4 w-full mt-10 hover:bg-red-600">

        <FaSignOutAlt />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;