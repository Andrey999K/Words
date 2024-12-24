import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Page.tsx";
import { Home } from "./pages/Home/Page.tsx";
import { Routes } from "./utils/routesConfig.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
