import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Always calculate subtotal from cart
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  const deliveryCharge = subtotal >= 499 ? 0 : 40;

  const gst = Number((subtotal * 0.05).toFixed(2));

  const grandTotal = subtotal + deliveryCharge + gst;

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-24 text-center">
        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-4">
          Add some delicious pizzas 🍕
        </p>

        <Link
          to="/menu"
          className="inline-block mt-8 bg-red-600 text-white px-8 py-3 rounded-lg"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            🛒 My Cart
          </h1>
          <p className="text-gray-500 mt-2">
            Review your delicious pizzas before checkout.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item, index) => {

              const itemTotal =
                Number(item.price || 0) *
                Number(item.quantity || 1);

              return (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                >

                  <div className="flex flex-col md:flex-row">

                    {/* Image */}

                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/250"
                      }
                      alt={item.name}
                      className="w-full md:w-56 h-56 object-cover"
                    />

                    {/* Details */}

                    <div className="flex-1 p-6">

                      <div className="flex justify-between">

                        <div>

                          <h2 className="text-2xl font-bold">
                            {item.name}
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            Freshly prepared with premium ingredients.
                          </p>

                        </div>

                        <div className="text-right">

                          <h2 className="text-3xl font-bold text-red-600">
                            ₹{itemTotal.toFixed(2)}
                          </h2>

                        </div>

                      </div>

                      {/* Options */}

                      <div className="grid grid-cols-2 gap-4 mt-6">

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">
                            Base
                          </p>
                          <p className="font-semibold">
                            {item.baseName || "Default"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">
                            Sauce
                          </p>
                          <p className="font-semibold">
                            {item.sauceName || "Default"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">
                            Cheese
                          </p>
                          <p className="font-semibold">
                            {item.cheeseName || "Default"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500">
                            Vegetables
                          </p>

                          <p className="font-semibold text-sm">
                            {item.vegetableNames?.length
                              ? item.vegetableNames.join(", ")
                              : "None"}
                          </p>

                        </div>

                      </div>

                      {/* Footer */}

                      <div className="flex justify-between items-center mt-8">

                        {/* Quantity */}

                        <div className="flex items-center border rounded-xl overflow-hidden">

                          <button
                            onClick={() => decreaseQuantity(index)}
                            className="w-10 h-10 bg-gray-100 hover:bg-red-600 hover:text-white transition"
                          >
                            −
                          </button>

                          <span className="w-12 text-center font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(index)}
                            className="w-10 h-10 bg-gray-100 hover:bg-green-600 hover:text-white transition"
                          >
                            +
                          </button>

                        </div>

                        {/* Remove */}

                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 font-semibold hover:text-red-700 transition"
                        >
                          🗑 Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          {/* Order Summary */}

          <div className="sticky top-24">

            <div className="bg-white rounded-2xl shadow-lg p-7">

              <h2 className="text-3xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>
                  <span className="font-semibold">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    GST (5%)
                  </span>
                  <span className="font-semibold">
                    ₹{gst.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Delivery
                  </span>

                  <span className="font-semibold text-green-600">
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge.toFixed(2)}`}
                  </span>

                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-red-600">
                    ₹{grandTotal.toFixed(2)}
                  </span>

                </div>

              </div>

              <Link
                to="/checkout"
                className="mt-8 block w-full text-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300"
              >
                Proceed to Checkout →
              </Link>

              <div className="mt-5 text-center text-sm text-gray-500">
                🔒 Secure Payments • Fast Delivery • 24×7 Support
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Cart;