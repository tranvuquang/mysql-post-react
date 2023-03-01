import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/chat/ChatPage";
import ChatHomePage from "../pages/chat";
import ChatId from "../pages/chat/ChatId";


type Props = {};

const TasksRoute = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatHomePage />}>
          <Route index element={<ChatPage />} />
          <Route path=":id" element={<ChatId />} />
        </Route>
      </Routes>
    </>
  );
};

export default TasksRoute;
