import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaPizzaSlice,
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();

  const isLoggedIn =
    !!user || !!localStorage.getItem("token");

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-red-600"
        >
          <FaPizzaSlice />
          PizzaHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          <Link
            to="/"
            className="hover:text-red-600 transition"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="hover:text-red-600 transition"
          >
            Menu
          </Link>

          {isLoggedIn && (
            <Link
              to="/orders"
              className="hover:text-red-600 transition"
            >
              My Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="hover:text-red-600 transition"
            >
              Admin
            </Link>
          )}

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-2xl hover:text-red-600"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-red-600 text-white
                  rounded-full w-5 h-5
                  flex items-center justify-center
                  text-xs
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">

              <Link
                to="/profile"
                className="text-2xl hover:text-red-600"
              >
                <FaUserCircle />
              </Link>

              <button
                onClick={handleLogout}
                className="
                  bg-gray-800
                  text-white
                  px-4 py-2
                  rounded-lg
                  hover:bg-black
                "
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="
                bg-red-600
                text-white
                px-4 py-2
                rounded-lg
                hover:bg-red-700
              "
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow px-6 py-5 space-y-4">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            Home
          </Link>

          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="block"
          >
            Menu
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="block"
              >
                My Orders
              </Link>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block"
              >
                Profile
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="
                  bg-gray-800
                  text-white
                  px-4 py-2
                  rounded-lg
                "
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;