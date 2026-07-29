import api from "./api";

export const getDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getRecentOrders = async () => {
  const res = await api.get("/admin/recent-orders");
  return res.data;
};





export const createPizza = async (data) => {
  const res = await api.post(
    "/admin/pizzas",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const updatePizza = async (
  id,
  data
) => {
  const res = await api.put(
    `/admin/pizzas/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deletePizza = async (id) => {
  const res = await api.delete(`/admin/pizzas/${id}`);
  return res.data;
}