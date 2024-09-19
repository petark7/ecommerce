"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotal, setFirebaseCart } from "./redux/slices/cartSlice";
import { selectUser } from "./redux/slices/userSlice";
import Home from "./pages/home";
import ProductList from "./components/ProductList";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    if (user) {
      dispatch(setFirebaseCart(user.uid));
    }
  }, [cartTotal, user]);

  return <ProductList />;
};

export default App;
