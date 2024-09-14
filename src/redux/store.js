import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import sidebarReducer from "./slices/sidebarSlice";
import ordersReducer from "./slices/ordersSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      product: productReducer,
      sidebar: sidebarReducer,
      orders: ordersReducer,
    },
  });
};
