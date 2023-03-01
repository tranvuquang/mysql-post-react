import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../axios/axiosConfig";
// import { logout } from "../../axios/axiosConfig";
import { selectAuth } from "../../features/auth/authSlice";
import Menu from "../Menu/Menu";

type Props = {};

const Layout = (props: Props) => {
  const { user, accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  return (
    <>
      <Menu />
      <hr />
      <div className="navbar">
        <div className="links">
          {!(user && accessToken) ? (
            <>
              <Link to="/login"> Login</Link>
              <Link to="/registration"> Registration</Link>
            </>
          ) : (
            <>
              <Link to="/"> Home Page</Link>
              <Link to="/createpost"> Create A Post</Link>
            </>
          )}
        </div>
        <div className="loggedInContainer">
          <h1>{user.username} </h1>
          {user && accessToken && (
            <button onClick={() => logout(dispatch)}> Logout</button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
