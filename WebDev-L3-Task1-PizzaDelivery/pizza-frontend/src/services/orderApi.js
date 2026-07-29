import api from "./api";

export const placeCODOrder = async (data) => {
  const res = await api.post("/payment/cod", data);
  return res.data;
};

export const createRazorpayOrder = async (data) => {
  const res = await api.post("/payment/create-order", data);
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payment/verify", data);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (id, data) => {
  const res = await api.put(`/orders/${id}/status`, data);
  return res.data;
};