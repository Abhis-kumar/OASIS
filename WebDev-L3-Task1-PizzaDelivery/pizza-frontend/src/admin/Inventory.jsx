import { useEffect, useState } from "react";
import api from "../services/api";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    type: "base",
    stock: "",
    price: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await api.get("/inventory");

      if (res.data.success) {
        setInventory(res.data.inventory);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/inventory", {
        ...form,
        stock: Number(form.stock),
        price: Number(form.price),
      });

      if (res.data.success) {
        alert("Inventory Added");

        setForm({
          name: "",
          type: "base",
          stock: "",
          price: "",
        });

        fetchInventory();
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add inventory");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await api.delete(`/inventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2 className="p-8">Loading...</h2>;
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Inventory Management
      </h1>

      {/* Add Inventory */}

      <form
        onSubmit={handleAdd}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="base">Base</option>
          <option value="sauce">Sauce</option>
          <option value="cheese">Cheese</option>
          <option value="vegetable">Vegetable</option>
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-red-600 text-white rounded p-2 md:col-span-4 hover:bg-red-700"
        >
          Add Inventory
        </button>
      </form>

      {/* Inventory Table */}

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item._id}
                className="text-center border-b"
              >
                <td className="p-3">{item.name}</td>

                <td className="p-3 capitalize">
                  {item.type}
                </td>

                <td
                  className={`p-3 font-semibold ${item.stock <= 5
                      ? "text-red-600"
                      : "text-green-600"
                    }`}
                >
                  {item.stock}
                </td>

                <td className="p-3">
                  ₹{item.price}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteItem(item._id)}
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
};

export default Inventory;