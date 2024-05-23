import { BrowserRouter, Route, Routes } from "react-router-dom";

import Error from "../pages/error";
import ProtectedRoutes from "./ProtectedRoutes";
import OpenRoutes from "./OpenRoutes";
import GuestHome from "../pages/guestHome";
import Authenticate from "../components/form/Auth";
import AuthRoutes from "./AuthRoutes";
import ToDoPage from "../pages/todo";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/todo" element={<ToDoPage />} />
        </Route>
        <Route element={<OpenRoutes />}>
          <Route path="/" element={<GuestHome />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Authenticate />} />
          <Route path="/register" element={<Authenticate />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
