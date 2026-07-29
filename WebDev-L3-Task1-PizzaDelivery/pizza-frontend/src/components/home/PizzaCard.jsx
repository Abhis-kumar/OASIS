import React from "react";
import { useNavigate } from "react-router-dom";

const PizzaCard = ({ pizza }) => {
  const navigate = useNavigate();

  const handleCustomize = () => {
    navigate("/build-pizza", {
      state: {
        pizza,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Pizza Image */}
      <img
        src={pizza.image}
        alt={pizza.name}
        className="h-56 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">

        <h2 className="text-2xl font-bold text-gray-800">
          {pizza.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {pizza.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-red-600 text-2xl font-bold">
            ₹{pizza.price}
          </span>

          <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
            Available
          </span>

        </div>

        <button
          onClick={handleCustomize}
          className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition duration-300"
        >
          Customize & Order
        </button>

      </div>

    </div>
  );
};

export default PizzaCard;