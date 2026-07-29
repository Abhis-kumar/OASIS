import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  LogOut,
  Package,
} from "lucide-react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-40"></div>

        {/* Avatar */}
        <div className="flex justify-center -mt-16">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=FF5722&color=fff&size=200`}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <div className="flex items-center gap-3">
            <User className="text-orange-500" />
            <div>
              <p className="text-gray-500">Full Name</p>
              <h3 className="font-semibold">{user.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-orange-500" />
            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">{user.email}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="text-orange-500" />
            <div>
              <p className="text-gray-500">Role</p>
              <h3 className="font-semibold capitalize">{user.role}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <div>
              <p className="text-gray-500">Email Status</p>
              <h3 className="font-semibold">
                {user.isVerified ? "Verified" : "Not Verified"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-orange-500" />
            <div>
              <p className="text-gray-500">Joined</p>
              <h3 className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pb-8">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition"
          >
            <Package size={18} />
            My Orders
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;