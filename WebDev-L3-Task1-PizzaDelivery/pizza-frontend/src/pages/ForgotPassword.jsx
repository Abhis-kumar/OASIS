import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(res.message);

      setEmail("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your registered email address.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <p className="text-center mt-6">

          <Link
            to="/login"
            className="text-red-600 font-semibold"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;