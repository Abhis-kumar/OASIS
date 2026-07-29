import { useState } from "react";

function OtpModal({
  open,
  phone,
  loading,
  onVerify,
  onResend,
  onClose,
}) {
  const [otp, setOtp] = useState("");

  if (!open) return null;

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    onVerify(otp);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[400px] p-8">

        <h2 className="text-2xl font-bold text-center">
          OTP Verification
        </h2>

        <p className="text-center text-gray-500 mt-3">
          OTP sent to
        </p>

        <p className="text-center font-semibold mb-6">
          {phone}
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
          placeholder="Enter OTP"
          className="w-full border rounded-lg p-3 text-center text-2xl tracking-[8px]"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={onResend}
          disabled={loading}
          className="w-full mt-3 text-red-600 font-semibold"
        >
          Resend OTP
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default OtpModal;