import api from "./api";

export const getAllPizzas = async () => {
  const res = await api.get("/pizzas");
  return res.data;
};

export const createPizza = async (formData) => {
  const res = await api.post("/pizzas", formData);
  return res.data;
};

export const updatePizza = async (id, formData) => {
  const res = await api.put(`/pizzas/${id}`, formData);
  return res.data;
};

export const deletePizza = async (id) => {
  const res = await api.delete(`/pizzas/${id}`);
  return res.data;
};