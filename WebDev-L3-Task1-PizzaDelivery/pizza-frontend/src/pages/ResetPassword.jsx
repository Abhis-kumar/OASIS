import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await resetPassword(token, formData.password);

      toast.success(res.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Reset Password Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Reset Password"}
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

export default ResetPassword;