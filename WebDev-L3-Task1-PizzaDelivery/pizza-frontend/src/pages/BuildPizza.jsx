import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function BuildPizza() {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const pizza = location.state?.pizza;

  const [inventory, setInventory] = useState([]);

  const [selectedBase, setSelectedBase] = useState("");
  const [selectedSauce, setSelectedSauce] = useState("");
  const [selectedCheese, setSelectedCheese] = useState("");
  const [selectedVegetables, setSelectedVegetables] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // ---------------- Inventory ----------------

  const fetchInventory = async () => {
    try {
      const res = await api.get("/inventory");

      console.log("Inventory:", res.data);

      setInventory(res.data.inventory || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Load inventory
  useEffect(() => {
    if (!pizza) {
      navigate("/menu");
      return;
    }

    fetchInventory();
  }, []);

  // Inventory Lists
  const bases = inventory.filter((item) => item.type === "base");

  const sauces = inventory.filter((item) => item.type === "sauce");

  const cheeses = inventory.filter((item) => item.type === "cheese");

  const vegetables = inventory.filter(
    (item) => item.type === "vegetable"
  );

  // ---------------- Price Calculation ----------------

  useEffect(() => {
    if (!pizza) return;

    let total = Number(pizza.price);

    const base = bases.find((item) => item._id === selectedBase);
    if (base) total += Number(base.price);

    const sauce = sauces.find((item) => item._id === selectedSauce);
    if (sauce) total += Number(sauce.price);

    const cheese = cheeses.find((item) => item._id === selectedCheese);
    if (cheese) total += Number(cheese.price);

    selectedVegetables.forEach((id) => {
      const veg = vegetables.find((item) => item._id === id);
      if (veg) {
        total += Number(veg.price);
      }
    });

    setTotalPrice(total * quantity);
  }, [
    pizza,
    quantity,
    selectedBase,
    selectedSauce,
    selectedCheese,
    selectedVegetables,
    inventory,
  ]);

  // ---------------- Toggle Vegetable ----------------

  const toggleVegetable = (id) => {
    setSelectedVegetables((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ---------------- Add To Cart ----------------

  const handleAddToCart = () => {
    const base =
      bases.find((item) => item._id === selectedBase) || null;

    const sauce =
      sauces.find((item) => item._id === selectedSauce) || null;

    const cheese =
      cheeses.find((item) => item._id === selectedCheese) || null;

    const vegObjects = vegetables.filter((item) =>
      selectedVegetables.includes(item._id)
    );

    let finalPrice = Number(pizza.price);

    if (base) finalPrice += Number(base.price);

    if (sauce) finalPrice += Number(sauce.price);

    if (cheese) finalPrice += Number(cheese.price);

    vegObjects.forEach((veg) => {
      finalPrice += Number(veg.price);
    });

    addToCart({
      pizza: pizza._id,
      name: pizza.name,
      image: pizza.image,

      base: base?._id ?? null,
      baseName: base?.name ?? "",

      sauce: sauce?._id ?? null,
      sauceName: sauce?.name ?? "",

      cheese: cheese?._id ?? null,
      cheeseName: cheese?.name ?? "",

      vegetables: vegObjects.map((v) => v._id),
      vegetableNames: vegObjects.map((v) => v.name),

      quantity,
      price: finalPrice,
    });

    alert("Pizza Added Successfully");
    navigate("/cart");
  };





  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-[450px] object-cover"
              />

              <div className="p-8">

                <h1 className="text-4xl font-bold text-gray-800">
                  {pizza.name}
                </h1>

                <p className="text-gray-500 mt-4 leading-7">
                  {pizza.description}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Customize Pizza
              </h2>

              {/* BASE */}

              <div className="mb-6">

                <label className="block font-semibold mb-2">
                  Pizza Base
                </label>

                <select
                  value={selectedBase}
                  onChange={(e) => setSelectedBase(e.target.value)}
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">
                    Default Base
                  </option>

                  {bases.map((base) => (
                    <option
                      key={base._id}
                      value={base._id}
                    >
                      {base.name} (+₹{base.price})
                    </option>
                  ))}
                </select>

              </div>

              {/* SAUCE */}

              <div className="mb-6">

                <label className="block font-semibold mb-2">
                  Sauce
                </label>

                <select
                  value={selectedSauce}
                  onChange={(e) => setSelectedSauce(e.target.value)}
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">
                    Default Sauce
                  </option>

                  {sauces.map((sauce) => (
                    <option
                      key={sauce._id}
                      value={sauce._id}
                    >
                      {sauce.name} (+₹{sauce.price})
                    </option>
                  ))}
                </select>

              </div>

              {/* CHEESE */}

              <div className="mb-6">

                <label className="block font-semibold mb-2">
                  Cheese
                </label>

                <select
                  value={selectedCheese}
                  onChange={(e) => setSelectedCheese(e.target.value)}
                  className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="">
                    Default Cheese
                  </option>

                  {cheeses.map((cheese) => (
                    <option
                      key={cheese._id}
                      value={cheese._id}
                    >
                      {cheese.name} (+₹{cheese.price})
                    </option>
                  ))}
                </select>

              </div>

              {/* VEGETABLES */}

              <div className="mb-8">

                <label className="block font-semibold mb-3">
                  Extra Vegetables
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {vegetables.map((veg) => (

                    <label
                      key={veg._id}
                      className={`rounded-xl border p-3 cursor-pointer transition-all duration-200 ${selectedVegetables.includes(veg._id)
                          ? "border-red-600 bg-red-50"
                          : "hover:border-red-400"
                        }`}
                    >

                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedVegetables.includes(veg._id)}
                        onChange={() => toggleVegetable(veg._id)}
                      />

                      <span className="font-medium">
                        {veg.name}
                      </span>

                      <div className="text-red-600 text-sm mt-1">
                        +₹{veg.price}
                      </div>

                    </label>

                  ))}

                </div>

              </div>

              {/* QUANTITY */}

              <div className="flex justify-between items-center mb-8">

                <span className="font-semibold">
                  Quantity
                </span>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(quantity - 1)
                    }
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* PRICE */}

              <div className="border-t pt-6">

                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">
                    Total Price
                  </span>

                  <span className="text-3xl font-bold text-red-600">
                    ₹{totalPrice.toFixed(2)}
                  </span>

                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition-all hover:scale-[1.02]"
                >
                  🛒 Add To Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );

}




export default BuildPizza;