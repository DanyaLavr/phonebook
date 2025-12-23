"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/user/operations";

export default function AutoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser.fulfilled({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
      }
    });
  }, [dispatch]);

  return null;
}
