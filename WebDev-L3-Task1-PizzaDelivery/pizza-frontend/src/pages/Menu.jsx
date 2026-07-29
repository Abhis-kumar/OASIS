import React, { useEffect, useMemo, useState } from "react";
import { getAllPizzas } from "../services/pizzaApi";
import PizzaCard from "../components/PizzaCard";

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const data = await getAllPizzas();
      setPizzas(data.pizzas || []);
    } catch (error) {
      console.log(error);
      setPizzas([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPizzas = useMemo(() => {
    return pizzas.filter((pizza) => {
      const matchesSearch = pizza.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || pizza.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [pizzas, search, category]);

  if (loading) {
    return (
      <div className="text-center text-2xl py-20 font-semibold">
        Loading Pizzas...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          🍕 Pizza Menu
        </h1>

        <p className="text-gray-500 mt-2">
          Freshly baked pizzas made with love.
        </p>
      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search Pizza..."
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCategory("All")}
          className={`px-5 py-2 rounded-full ${category === "All"
            ? "bg-orange-500 text-white"
            : "bg-gray-200"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Veg")}
          className={`px-5 py-2 rounded-full ${category === "Veg"
            ? "bg-green-600 text-white"
            : "bg-gray-200"
            }`}
        >
          Veg
        </button>

        <button
          onClick={() => setCategory("Non-Veg")}
          className={`px-5 py-2 rounded-full ${category === "Non-Veg"
            ? "bg-red-600 text-white"
            : "bg-gray-200"
            }`}
        >
          Non-Veg
        </button>
      </div>

      {/* Pizza Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <PizzaCard
              key={pizza._id}
              pizza={pizza}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500">
            No Pizza Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;