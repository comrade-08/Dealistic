import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

// 🔹 Fetch all orders of logged-in user
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const r = await api.get("/orders");
  return r.data.orders || r.data;
});

// 🆕 Place a new order
export const placeOrder = createAsyncThunk(
  "orders/place",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'placeOrder')
      const r = await api.post("/orders", {
        products: payload
      });
      return r.data.order || r.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order"
      );
    }
  }
);

const slice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🧾 Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🛒 Place Order
      .addCase(placeOrder.pending, (state) => {
        state.status = "placing";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add new order to the top of the list
        state.items.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default slice.reducer;
