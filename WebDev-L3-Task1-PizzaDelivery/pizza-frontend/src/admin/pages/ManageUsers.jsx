import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userApi";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, { role });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Change Role</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b"
              >

                <td className="p-3">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageUsers;