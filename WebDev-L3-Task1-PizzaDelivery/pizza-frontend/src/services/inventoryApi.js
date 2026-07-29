import api from "./api";

/* Get All Inventory */

export const getInventory = async () => {
  const res = await api.get("/inventory");
  return res.data;
};

/* Get Single Item */

export const getInventoryById = async (id) => {
  const res = await api.get(`/inventory/${id}`);
  return res.data;
};

/* Create */

export const createInventoryItem = async (data) => {
  const res = await api.post("/inventory", data);
  return res.data;
};

/* Update */

export const updateInventoryItem = async (id, data) => {
  const res = await api.put(`/inventory/${id}`, data);
  return res.data;
};

/* Delete */

export const deleteInventoryItem = async (id) => {
  const res = await api.delete(`/inventory/${id}`);
  return res.data;
};