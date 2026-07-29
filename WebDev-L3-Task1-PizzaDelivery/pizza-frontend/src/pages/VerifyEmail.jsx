import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyEmail } from "../services/authApi";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await verifyEmail(token);

      toast.success(res.message);

      setVerified(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Verification Failed"
      );

      setVerified(false);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Verifying your email...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-5">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        {verified ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Email Verified 🎉
            </h1>

            <p className="text-gray-600 mb-6">
              Your account has been verified successfully.
            </p>

            <p className="text-gray-500">
              Redirecting to Login...
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              Verification Failed
            </h1>

            <p className="text-gray-600 mb-6">
              This verification link is invalid or has expired.
            </p>

            <Link
              to="/login"
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Go to Login
            </Link>
          </>
        )}

      </div>

    </div>
  );
}

export default VerifyEmail;