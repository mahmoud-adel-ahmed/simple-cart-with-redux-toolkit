import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

let initialState = {
  cartItems: cartItems,
  isLoading: true,
  error: null,
  amount: 0,
  total: 0,
};

export let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseAmount: (state, action) => {
      let cartItems = state.cartItems.map((item) =>
        item.id === action.payload ? { ...item, amount: item.amount + 1 } : item
      );
      state.cartItems = cartItems;
    },
    decreaseAmount: (state, action) => {
      let cartItems = state.cartItems.map((item) =>
        item.id === action.payload ? { ...item, amount: item.amount - 1 } : item
      );
      state.cartItems = cartItems;
    },
    calcTotal: (state) => {
      let { amount, total } = state.cartItems.reduce(
        (total, item) => {
          total.amount += item.amount;
          total.total += item.price * item.amount;
          return total;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      state.amount = amount;
      state.total = total;
    },
  },
});

export let {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calcTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
