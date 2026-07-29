import { useEffect, useState } from "react";

import {
  createInventoryItem,
  updateInventoryItem,
} from "../../services/inventoryApi";

function InventoryModal({
  isOpen,
  onClose,
  editingItem,
  refresh,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Base",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || "",
        category: editingItem.category || "Base",
        price: editingItem.price || "",
        stock: editingItem.stock || "",
      });
    } else {
      setFormData({
        name: "",
        category: "Base",
        price: "",
        stock: "",
      });
    }
  }, [editingItem]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await updateInventoryItem(
          editingItem._id,
          formData
        );
      } else {
        await createInventoryItem(formData);
      }

      refresh();
      onClose();

    } catch (error) {
      console.log(error);
      alert("Unable to save inventory item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          {editingItem
            ? "Edit Inventory"
            : "Add Inventory"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Ingredient Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Base">Base</option>
            <option value="Sauce">Sauce</option>
            <option value="Cheese">Cheese</option>
            <option value="Vegetable">Vegetable</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              {editingItem ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default InventoryModal;