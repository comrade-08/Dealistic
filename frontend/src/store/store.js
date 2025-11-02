import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import orderReducer from "./slices/ordersSlice.js";
import userReducer from "./slices/userSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
