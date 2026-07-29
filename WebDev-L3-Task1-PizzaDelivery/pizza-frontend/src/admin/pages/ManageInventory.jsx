import { useEffect, useState } from "react";
import {
  getInventory,
  deleteInventoryItem,
} from "../../services/inventoryApi";

import InventoryModal from "../components/InventoryModal";

function ManageInventory() {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setInventory(res.inventory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteInventoryItem(id);
      fetchInventory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <button
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          + Add Item
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {inventory.map((item) => (

            <tr key={item._id} className="border-b">

              <td className="p-3">{item.name}</td>

              <td>{item.category}</td>

              <td>₹{item.price}</td>

              <td>{item.stock}</td>

              <td>

                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <InventoryModal
        isOpen={showModal}
        editingItem={editingItem}
        onClose={() => {
          setShowModal(false);
          setEditingItem(null);
        }}
        refresh={fetchInventory}
      />

    </div>
  );
}

export default ManageInventory;