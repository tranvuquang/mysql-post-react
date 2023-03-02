import React from "react";
import { Routes, Route } from "react-router-dom";

const PostRoute = React.lazy(() => import("../routes/PostRoute"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

type Props = {};

const PrivatePages = (props: Props) => {
  return (
    <>
      <Routes>
        <Route
          path="/posts/*"
          element={
            <React.Suspense fallback={<h2>...Loading</h2>}>
              <PostRoute />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<h2>...Loading</h2>}>
              <NotFoundPage />
            </React.Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default PrivatePages;
