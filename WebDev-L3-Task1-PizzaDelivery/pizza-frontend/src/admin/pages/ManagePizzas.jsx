import { useEffect, useState } from "react";
import PizzaModal from "../components/PizzaModal";
import {
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
} from "../../services/pizzaApi";

function ManagePizza() {
  const [pizzas, setPizzas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPizza, setEditingPizza] = useState(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const res = await getAllPizzas();
      setPizzas(res.pizzas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (formData) => {
  try {
    console.log("Submitting...");

    if (editingPizza) {
      const res = await updatePizza(editingPizza._id, formData);
      console.log("Update:", res);
    } else {
      const res = await createPizza(formData);
      console.log("Create:", res);
    }

    await fetchPizzas();

    setIsOpen(false);
    setEditingPizza(null);

    alert(
      editingPizza
        ? "Pizza Updated Successfully"
        : "Pizza Added Successfully"
    );
  } catch (error) {
    console.log(error);

    console.log(error.response?.data);

    alert(error.response?.data?.message || "Something went wrong");
  }
};

  const handleEdit = (pizza) => {
    setEditingPizza(pizza);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pizza?")) return;

    try {
      await deletePizza(id);
      fetchPizzas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Manage Pizzas
        </h1>

        <button
          onClick={() => {
            setEditingPizza(null);
            setIsOpen(true);
          }}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Add Pizza
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {pizzas.map((pizza) => (

          <div
            key={pizza._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h2 className="text-xl font-bold">
                {pizza.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {pizza.description}
              </p>

              <p className="text-red-600 font-bold mt-3">
                ₹{pizza.price}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => handleEdit(pizza)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pizza._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      <PizzaModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingPizza(null);
        }}
        editingPizza={editingPizza}
        onSubmit={handleSubmit}
      />

    </div>
  );
}

export default ManagePizza;