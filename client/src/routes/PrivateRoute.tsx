import React, { ReactNode } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";

type Props = { children: ReactNode };

const PrivateRoute = ({ children }: Props) => {
  //   const [user] = useAuthState(auth);
  const { user, accessToken } = useAppSelector(selectAuth);
  // const user = true;
  return (
    <>
      {user && accessToken ? children : <Navigate to="/login" />}
      {/* {children} */}
    </>
  );
};

export default PrivateRoute;
