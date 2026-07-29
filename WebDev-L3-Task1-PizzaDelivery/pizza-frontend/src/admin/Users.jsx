import { useEffect, useState } from "react";
import api from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await api.delete(`/users/${id}`);

      if (res.data.success) {
        alert("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      console.log(error.response || error);
      alert(error.response?.data?.message || "Unable to delete user");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Users Management
      </h1>

      {users.length === 0 ? (
        <div className="text-center text-gray-500">
          No Users Found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="min-w-full">

            <thead className="bg-red-600 text-white">

              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Role</th>
                <th className="p-4 text-center">Verified</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {user.isVerified ? (
                      <span className="text-green-600 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        No
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">

                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Users;