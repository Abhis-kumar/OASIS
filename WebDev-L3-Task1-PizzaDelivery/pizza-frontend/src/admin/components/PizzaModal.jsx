import { useEffect, useState } from "react";

function PizzaModal({
  isOpen,
  onClose,
  onSubmit,
  editingPizza,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Veg",
    price: "",
    isAvailable: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editingPizza) {
      setFormData({
        name: editingPizza.name,
        description: editingPizza.description,
        category: editingPizza.category,
        price: editingPizza.price,
        isAvailable: editingPizza.isAvailable,
      });

      setPreview(editingPizza.image || "");
      setImage(null);
    } else {
      setFormData({
        name: "",
        description: "",
        category: "Veg",
        price: "",
        isAvailable: true,
      });

      setPreview("");
      setImage(null);
    }
  }, [editingPizza]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("isAvailable", formData.isAvailable);

    if (image) {
      data.append("image", image);
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">
          {editingPizza ? "Edit Pizza" : "Add Pizza"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Pizza Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-3"
            rows={3}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <div>
            <label className="block mb-2 font-medium">
              Pizza Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          )}

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Available
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
              {editingPizza ? "Update Pizza" : "Add Pizza"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default PizzaModal;