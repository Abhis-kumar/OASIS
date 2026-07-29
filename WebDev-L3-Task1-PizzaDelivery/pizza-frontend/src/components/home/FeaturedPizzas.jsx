import { useEffect, useState } from "react";
import { getAllPizzas } from "../../services/pizzaApi";
import PizzaCard from "./PizzaCard";

function FeaturedPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const data = await getAllPizzas();
      console.log(data);
      setPizzas(data.pizzas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl py-20">
        Loading...
      </h2>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold text-center">
        Featured Pizzas
      </h2>

      <p className="text-gray-500 text-center mt-3">
        Choose your favourite pizza
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza._id}
            pizza={pizza}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedPizzas;