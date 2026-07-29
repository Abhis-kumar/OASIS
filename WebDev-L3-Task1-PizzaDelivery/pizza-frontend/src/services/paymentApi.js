import api from "./api";
console.log(import.meta.env.VITE_API_URL);

export const placeCODOrder = async (orderData) => {
  const response = await api.post("/payment/cod", orderData);
  return response.data;
};

export const createRazorpayOrder = async (orderData) => {
  try {
    console.log("Base URL:", import.meta.env.VITE_API_URL);
    console.log("Sending:", orderData);

    const response = await api.post("/payment/create-order", orderData);

    return response.data;
  } catch (err) {
    console.log("Request URL:", err.config?.baseURL + err.config?.url);
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    throw err;
  }
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/payment/verify", paymentData);
  return response.data;
};