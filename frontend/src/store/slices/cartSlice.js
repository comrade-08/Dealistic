import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const p = state.items.find((i) => i.product === action.payload.product);
      if (p) p.quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = slice.actions;
export default slice.reducer;
