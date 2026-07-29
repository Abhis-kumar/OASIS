import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <FaBell
          size={22}
          className="cursor-pointer"
        />

        <FaUserCircle
          size={34}
          className="cursor-pointer"
        />

      </div>

    </div>
  );
}

export default Topbar;