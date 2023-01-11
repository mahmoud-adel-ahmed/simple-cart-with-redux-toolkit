import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import modalSlice from "./features/modal/modalSlice";

export let store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
});
