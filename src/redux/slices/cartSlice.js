import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartFirestore, setCartFirestore } from "../../firebase/utils";
import { logUserOut } from "./userSlice";

export const syncWithFirestore = createAsyncThunk(
  "cart/syncWithFirestore",
  async (userId, thunkAPI) => {
    const cart = thunkAPI.getState().cart.cart;
    const firebaseCart = await getCartFirestore(userId);
    if (cart.length > 0) {
      await setCartFirestore(userId, cart);
      return cart;
    }

    await setCartFirestore(userId, cart);
    return firebaseCart;
  }
);

export const setFirebaseCart = createAsyncThunk(
  "cart/setFirebaseCart",
  async (userId, thunkAPI) => {
    const cart = thunkAPI.getState().cart.cart;
    await setCartFirestore(userId, cart);
    return cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartTotal: null,
    numberOfProducts: 0,
    syncedWithFirestore: false,
    isUpdating: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const newItem = { ...product, amount: 1 };

      // Check if item is added already.
      // If item already in cart, increment value only. Otherwise, add item + value of 1
      const cartItem = state.cart.find((item) => item.id === product.id);
      if (cartItem) {
        const updatedCart = [...state.cart].map((item) =>
          item.id === product.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
        state.cart = updatedCart;
      } else {
        state.cart.push(newItem);
      }

      state.syncedWithFirestore = false;
    },
    decrementProductAmount: (state, action) => {
      const product = action.payload;
      // Find item and decrement amount by 1
      const cartItem = state.cart.find((item) => item.id === product.id);
      const updatedCart = [...state.cart].map((item) =>
        item.id === product.id ? { ...item, amount: cartItem.amount - 1 } : item
      );
      state.cart = updatedCart;
      state.syncedWithFirestore = false;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const newCart = state.cart.filter((product) => product.id !== id);
      state.cart = newCart;
      state.syncedWithFirestore = false;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = null;
      state.numberOfProducts = 0;
      state.syncedWithFirestore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncWithFirestore.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(syncWithFirestore.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isUpdating = false;
      })
      .addCase(setFirebaseCart.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(setFirebaseCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isUpdating = false;
      })
      .addCase(logUserOut, (state) => {
        state.cart = [];
        state.cartTotal = null;
        state.numberOfProducts = 0;
        state.syncedWithFirestore = false;
        state.isUpdating = false; // Add this line
      });
  },
});

export const { addToCart, decrementProductAmount, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectIsUpdating = (state) => state.cart.isUpdating;
export const selectNumberOfProducts = (state) =>
  state.cart.cart.reduce((total, product) => total + product.amount, 0);
export const selectCartTotal = (state) =>
  state.cart?.cart.reduce(
    (total, product) => total + product.amount * product.price,
    0
  );

export default cartSlice.reducer;
