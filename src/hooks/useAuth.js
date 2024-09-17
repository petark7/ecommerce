// hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/utils";
import { useDispatch } from "react-redux";
import { setUser, fetchAccountSettings } from "../redux/slices/userSlice";
import { syncWithFirestore } from "../redux/slices/cartSlice";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            accessToken: user.accessToken,
          })
        );
        dispatch(syncWithFirestore(user.uid));
        dispatch(fetchAccountSettings(user.uid));
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { loading };
}
