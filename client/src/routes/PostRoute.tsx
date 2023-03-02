import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "../pages/post";
import PostFormId from "../pages/post/PostFormId";
import PostHomePage from "../pages/post/PostHomePage";
import PostViewId from "../pages/post/PostViewId";

type Props = {};

const TasksRoute = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostPage />}>
          <Route index element={<PostHomePage />} />
          <Route path="/create" element={<PostFormId />} />
          <Route path="/update/:id" element={<PostFormId />} />
          <Route path="/:id" element={<PostViewId />} />
        </Route>
      </Routes>
    </>
  );
};

export default TasksRoute;
