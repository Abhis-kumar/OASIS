import { Link } from "react-router-dom";
import heroPizza from "../../assets/—Pngtree—authentic italian pizza with cheese_19857475.png";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Left */}
        <div className="flex-1">

          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
            🔥 Fresh & Hot Pizza
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold mt-6 leading-tight">
            Delicious Pizza
            <br />
            Delivered
            <span className="text-red-600"> Fast</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            Enjoy handcrafted pizzas made with fresh ingredients.
            Customize every bite and get it delivered to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/menu"
              className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition font-semibold"
            >
              Order Now
            </Link>

            <Link
              to="/build-pizza"
              className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl hover:bg-red-600 hover:text-white transition font-semibold"
            >
              Build Your Pizza
            </Link>

          </div>

        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">

          <img
            src={heroPizza}
            alt="Pizza"
            className="w-[500px] drop-shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;