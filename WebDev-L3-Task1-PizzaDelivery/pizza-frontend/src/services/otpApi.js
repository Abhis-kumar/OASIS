import api from "./api";

// Send OTP
export const sendOtp = async (phone) => {
  const res = await api.post("/otp/send", {
    phone,
  });

  return res.data;
};

// Verify OTP
export const verifyOtp = async (phone, otp) => {
  const res = await api.post("/otp/verify", {
    phone,
    otp,
  });

  return res.data;
};