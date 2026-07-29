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
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPizza, setEditingPizza] = useState(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      setLoading(true);

      const res = await getAllPizzas();

      setPizzas(res.pizzas || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load pizzas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingPizza) {
        await updatePizza(editingPizza._id, formData);
        alert("Pizza Updated Successfully");
      } else {
        await createPizza(formData);
        alert("Pizza Added Successfully");
      }

      setIsOpen(false);
      setEditingPizza(null);

      fetchPizzas();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const handleEdit = (pizza) => {
    setEditingPizza(pizza);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pizza?"
    );

    if (!confirmDelete) return;

    try {
      await deletePizza(id);

      alert("Pizza Deleted Successfully");

      fetchPizzas();
    } catch (error) {
      console.log(error);

      alert("Failed to delete pizza");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Manage Pizzas
        </h1>

        <button
          onClick={() => {
            setEditingPizza(null);
            setIsOpen(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          + Add Pizza
        </button>

      </div>

      {pizzas.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          No Pizzas Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {pizzas.map((pizza) => (

            <div
              key={pizza._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  pizza.image ||
                  "https://via.placeholder.com/500x300?text=Pizza"
                }
                alt={pizza.name}
                className="w-full h-52 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x300?text=Pizza";
                }}
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {pizza.name}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {pizza.description}
                </p>

                <div className="flex justify-between mt-4">

                  <span className="font-semibold">
                    {pizza.category}
                  </span>

                  <span className="text-red-600 font-bold">
                    ₹{pizza.price}
                  </span>

                </div>

                <div className="mt-2">

                  {pizza.isAvailable ? (
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Not Available
                    </span>
                  )}

                </div>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(pizza)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(pizza._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

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