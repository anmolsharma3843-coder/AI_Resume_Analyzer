
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setUser,
  clearUser,
} from "../store/auth/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok || !data.user) {
          dispatch(clearUser());
          return;
        }

        dispatch(setUser(data.user));
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
