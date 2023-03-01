import React from "react";
import { NavLink } from "react-router-dom";

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#0d6efd" : "inherit",
  textDecoration: isActive ? "underLine" : "none",
});

type Props = {};

const Menu = (props: Props) => {
  return (
    <div>
      <ul style={{ display: "flex" }}>
        <li style={{ listStyle: "none", margin: "0px 5px " }}>
          <NavLink to="/home" style={navLinkStyle}>
            Home
          </NavLink>
        </li>
        <li style={{ listStyle: "none", margin: "0px 5px " }}>
          <NavLink to="/login" style={navLinkStyle}>
            Login
          </NavLink>
        </li>
        <li style={{ listStyle: "none", margin: "0px 5px " }}>
          <NavLink to="/chat" style={navLinkStyle}>
            Chat
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
