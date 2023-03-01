import React from "react";
import { Routes, Route } from "react-router-dom";

const ChatRoute = React.lazy(() => import("../routes/ChatRoute"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

type Props = {};

const PrivatePages = (props: Props) => {
  return (
    <>
      <Routes>
        <Route
          path="/chat/*"
          element={
            <React.Suspense fallback={<h2>...Loading</h2>}>
              <ChatRoute />
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
