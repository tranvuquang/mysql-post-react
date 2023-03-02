import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const PostHomePage = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PostHomePage;
