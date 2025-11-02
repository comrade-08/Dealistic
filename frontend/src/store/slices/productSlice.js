import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const r = await api.get("/products");
  return r.data.products || r.data;
});

export const fetchVendorProducts = createAsyncThunk("vendorproducts/fetch", async () => {
  const r = await api.get("/products/vendor-products");
  return r.data.products || r.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (payload) => {
    const r = await api.post("/products", payload);
    return r.data.product || r.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, payload }) => {
    console.log(id, payload, 'updateProduct')
    const r = await api.put(`/products/${id}`, payload);
    return r.data.product || r.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(fetchVendorProducts.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(createProduct.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })
      .addCase(updateProduct.fulfilled, (s, a) => {
        const idx = s.items.findIndex((p) => p._id === a.payload._id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.items = s.items.filter((p) => p._id !== a.payload);
      });
  },
});
 
export default slice.reducer;
