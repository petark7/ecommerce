import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartFirestore, setCartFirestore } from "../../firebase/utils";

export const syncWithFirestore = createAsyncThunk(
  "cart/syncWithFirestore",
  async (userId, thunkAPI) => {
    const cart = thunkAPI.getState().cart.cart;
    const firebaseCart = await getCartFirestore(userId);
    if (cart.length > 0) {
      await setCartFirestore(userId, cart);
      return cart;
    }
    await setCartFirestore(userId, firebaseCart);
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

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.user?.uid; // Assuming user ID is stored here
    const currentCart = state.cart.cart;

    let newCart;
    const cartItem = currentCart.find((item) => item.id === product.id);
    if (cartItem) {
      newCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      );
    } else {
      newCart = [...currentCart, { ...product, amount: 1 }];
    }

    // If user is logged in, sync with Firebase
    if (userId) {
      await setCartFirestore(userId, newCart);
    }

    return newCart;
  }
);

export const decrementProductAmount = createAsyncThunk(
  "cart/decrementProductAmount",
  async (product, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.user?.uid;
    const currentCart = state.cart.cart;

    const newCart = currentCart
      .map((item) =>
        item.id === product.id
          ? { ...item, amount: Math.max(0, item.amount - 1) }
          : item
      )
      .filter((item) => item.amount > 0);

    if (userId) {
      await setCartFirestore(userId, newCart);
    }

    return newCart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.user?.uid;
    const currentCart = state.cart.cart;

    const newCart = currentCart.filter((product) => product.id !== productId);

    if (userId) {
      await setCartFirestore(userId, newCart);
    }

    return newCart;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.user.user?.uid;

    if (userId) {
      await setCartFirestore(userId, []);
    }

    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncWithFirestore.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(syncWithFirestore.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isUpdating = false;
      })
      .addCase(syncWithFirestore.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      })
      .addCase(setFirebaseCart.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(setFirebaseCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isUpdating = false;
      })
      .addCase(setFirebaseCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decrementProductAmount.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(clearCart.rejected, (state) => {
        state.error;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const selectCart = (state) => state.cart.cart;
export const selectIsUpdating = (state) => state.cart.isUpdating;
export const selectError = (state) => state.cart.error;
export const selectNumberOfProducts = (state) =>
  state.cart.cart.reduce((total, product) => total + product.amount, 0);
export const selectCartTotal = (state) =>
  state.cart.cart.reduce(
    (total, product) => total + product.amount * product.price,
    0
  );

export default cartSlice.reducer;
