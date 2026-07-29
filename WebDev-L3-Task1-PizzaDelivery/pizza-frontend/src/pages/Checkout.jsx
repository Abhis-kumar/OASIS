import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import {
  placeCODOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../services/paymentApi";

import OtpModal from "../components/OtpModal";
import { loadRazorpay } from "../utils/loadRazorpay";

import { auth } from "../firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";


function Checkout() {

  const {
    cart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // Subtotal
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  // Delivery Charge
  const deliveryCharge =
    totalPrice > 499 ? 0 : 40;

  // GST
  const gst = Number(
    (totalPrice * 0.05).toFixed(2)
  );

  // Grand Total
  const grandTotal = Number(
    (
      totalPrice +
      gst +
      deliveryCharge
    ).toFixed(2)
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [otpOpen, setOtpOpen] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [confirmationResult, setConfirmationResult] =
    useState(null);

  const [pendingOrder, setPendingOrder] =
    useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });



  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };



  useEffect(() => {

    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal"
          }
        );


      window.recaptchaVerifier.render();

    }

  }, []);





  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (
        !formData.fullName ||
        !formData.phone ||
        !formData.address
      ) {
        alert("Please fill all required fields");
        return;
      }

      console.log("========== CART ==========");
      console.log(cart);

      // Prepare cart items safely
      const items = cart.map((item) => ({
        pizza:
          item.pizza && typeof item.pizza === "object"
            ? item.pizza._id
            : item.pizza || item._id,

        base:
          item.base && typeof item.base === "object"
            ? item.base._id
            : item.base || null,

        sauce:
          item.sauce && typeof item.sauce === "object"
            ? item.sauce._id
            : item.sauce || null,

        cheese:
          item.cheese && typeof item.cheese === "object"
            ? item.cheese._id
            : item.cheese || null,

        vegetables: (item.vegetables || []).map((veg) =>
          veg && typeof veg === "object"
            ? veg._id
            : veg
        ),

        quantity: Number(item.quantity) || 1,

        price: Number(item.price) || 0,
      }));

      console.log("========== ITEMS ==========");
      console.log(items);

      // Validate Pizza ID
      for (const item of items) {
        if (!item.pizza) {
          alert("Pizza ID missing.");
          return;
        }
      }

      const orderData = {
        items,
        deliveryDetails: formData,
        paymentMethod,
        totalAmount: totalPrice,
      };

      console.log("========== ORDER DATA ==========");
      console.log(orderData);

      setPendingOrder(orderData);

      setSendingOtp(true);

      const result = await signInWithPhoneNumber(
        auth,
        `+91${formData.phone}`,
        window.recaptchaVerifier
      );

      setConfirmationResult(result);
      setOtpOpen(true);

      alert("OTP Sent Successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "OTP Failed"
      );
    } finally {
      setSendingOtp(false);
    }
  };




  const verifyOtpHandler = async (otp) => {
    try {
      setVerifyingOtp(true);

      if (!confirmationResult) {
        alert("Please send OTP first");
        return;
      }

      // Verify Firebase OTP
      await confirmationResult.confirm(otp);

      setOtpOpen(false);

      // ---------------- COD ----------------
      if (paymentMethod === "COD") {
        const order = await placeCODOrder(pendingOrder);

        if (order.success) {
          alert("Order Placed Successfully");

          clearCart(); // import clearCart from CartContext

          navigate("/orders");
        } else {
          alert(order.message || "Unable to place order");
        }

        return;
      }

      // ---------------- ONLINE ----------------

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Unable to load Razorpay");
        return;
      }

      // Create Razorpay Order
      const razorpayOrder = await createRazorpayOrder(pendingOrder);

      if (!razorpayOrder.success) {
        alert(razorpayOrder.message);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: razorpayOrder.order.amount,

        currency: razorpayOrder.order.currency,

        order_id: razorpayOrder.order.id,

        name: "PizzaHub",

        description: "Pizza Order",

        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },

        theme: {
          color: "#dc2626",
        },

        handler: async (response) => {
          try {
            const verify = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              items: pendingOrder.items,
              deliveryDetails: pendingOrder.deliveryDetails,
              paymentMethod: "ONLINE",
            });

            if (verify.success) {
              alert("Payment Successful");

              clearCart();

              navigate("/orders");
            } else {
              alert(verify.message || "Payment verification failed");
            }
          } catch (err) {
            console.log(err);
            alert("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            alert("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || error.message || "Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };



  console.log("Cart:", cart);

  cart.forEach((item) => {
    console.log({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: Number(item.price) * Number(item.quantity),
    });
  });

  console.log("Checkout Total:", totalPrice);


  return (


    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-5">

          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Side */}
            <div className="lg:col-span-2 space-y-8">

              {/* Delivery Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6">
                  🚚 Delivery Details
                </h2>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 mb-5 focus:ring-2 focus:ring-red-500 outline-none"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Mobile Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-xl p-4 mb-5 focus:ring-2 focus:ring-red-500 outline-none"
                />

                <textarea
                  rows={4}
                  name="address"
                  placeholder="Enter Delivery Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-red-500 outline-none"
                />

              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-bold mb-6">
                  💳 Payment Method
                </h2>

                <div className="space-y-4">

                  <label className="flex justify-between items-center border rounded-xl p-4 cursor-pointer hover:border-red-500 transition">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                      />

                      <span className="font-semibold">
                        Cash On Delivery
                      </span>

                    </div>

                    <span className="text-2xl">💵</span>

                  </label>

                  <label className="flex justify-between items-center border rounded-xl p-4 cursor-pointer hover:border-red-500 transition">

                    <div className="flex items-center gap-3">

                      <input
                        type="radio"
                        value="ONLINE"
                        checked={paymentMethod === "ONLINE"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                      />

                      <span className="font-semibold">
                        Online Payment
                      </span>

                    </div>

                    <span className="text-2xl">💳</span>

                  </label>

                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                🍕 Order Summary
              </h2>

              {cart.length === 0 ? (

                <p className="text-gray-500">
                  Cart is Empty
                </p>

              ) : (

                cart.map((item, index) => (

                  <div
                    key={index}
                    className="flex gap-4 border-b pb-5 mb-5"
                  >

                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/100"
                      }
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>

                      {item.baseName && (
                        <p className="text-xs text-gray-500">
                          Base : {item.baseName}
                        </p>
                      )}

                      {item.sauceName && (
                        <p className="text-xs text-gray-500">
                          Sauce : {item.sauceName}
                        </p>
                      )}

                      {item.cheeseName && (
                        <p className="text-xs text-gray-500">
                          Cheese : {item.cheeseName}
                        </p>
                      )}

                      {item.vegetableNames?.length > 0 && (
                        <p className="text-xs text-gray-500">
                          Veggies : {item.vegetableNames.join(", ")}
                        </p>
                      )}

                    </div>

                    <div className="font-bold text-red-600">

                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toFixed(2)}

                    </div>

                  </div>

                ))

              )}

              {/* Price Details */}

              <div className="bg-gray-50 rounded-xl p-5 mt-6 space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
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

              <button
                onClick={handlePlaceOrder}
                disabled={sendingOtp || cart.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition"
              >
                {sendingOtp
                  ? "Sending OTP..."
                  : paymentMethod === "ONLINE"
                    ? "Proceed to Payment"
                    : "Verify Phone & Place Order"}
              </button>

            </div>

          </div>
        </div>
      </div>

      <div id="recaptcha-container"></div>

      <OtpModal
        open={otpOpen}
        phone={formData.phone}
        loading={verifyingOtp}
        onVerify={verifyOtpHandler}
        onResend={handlePlaceOrder}
        onClose={() => setOtpOpen(false)}
      />
    </>
  );

}


export default Checkout;