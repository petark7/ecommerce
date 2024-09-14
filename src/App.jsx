"use client";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/utils";
import {
  fetchAccountSettings,
  selectUser,
  setUser,
} from "./redux/slices/userSlice";
import {
  selectCartTotal,
  setFirebaseCart,
  syncWithFirestore,
} from "./redux/slices/cartSlice";
import Home from "./pages/home";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            accessToken: user.accessToken,
          })
        );
        dispatch(syncWithFirestore(user.uid));
        dispatch(fetchAccountSettings(user.uid));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setFirebaseCart(user?.uid));
  }, [cartTotal]);
  return (
    <>
      <ToastContainer />
      <Home />
    </>
  );
};

export default App;
