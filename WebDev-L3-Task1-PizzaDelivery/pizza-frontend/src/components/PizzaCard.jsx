import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from ".././context/CartContext";

const PizzaCard = ({ pizza }) => {

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // Direct Add To Cart
  const handleAddToCart = () => {

    addToCart({

      pizza: pizza._id,

      name: pizza.name,

      image: pizza.image,

      price: pizza.price,

      quantity: 1,


      // No customization
      base: null,
      baseName: "",

      sauce: null,
      sauceName: "",

      cheese: null,
      cheeseName: "",

      vegetables: [],
      vegetableNames: []

    });


    navigate("/cart");

  };



  // Customize Pizza

  const handleCustomize = () => {

    navigate("/build-pizza", {

      state: {
        pizza
      }

    });

  };



  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden">


      <img

        src={
          pizza.image ||
          "https://via.placeholder.com/400x300"
        }

        alt={pizza.name}

        className="w-full h-56 object-cover"

      />



      <div className="p-5">


        <h2 className="text-xl font-bold">
          {pizza.name}
        </h2>



        <p className="text-gray-500 mt-2">
          {pizza.description}
        </p>




        <div className="flex justify-between mt-5">


          <span className="text-2xl font-bold text-orange-600">

            ₹{pizza.price}

          </span>


        </div>





        <div className="flex gap-3 mt-5">


          <button

            onClick={handleCustomize}

            className="flex-1 border border-orange-500 text-orange-500 py-2 rounded"

          >

            Customize

          </button>




          <button

            onClick={handleAddToCart}

            className="flex-1 bg-orange-500 text-white py-2 rounded"

          >

            Add To Cart

          </button>


        </div>



      </div>


    </div>

  );
};


export default PizzaCard;