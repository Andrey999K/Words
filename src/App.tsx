import { useGetUser } from "./api/api.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Page.tsx";
import { Home } from "./pages/Home/Page.tsx";
import { Routes } from "./utils/routesConfig.ts";

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Home />,
  },
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
]);

export const App = () => {
  const { data: userAuth } = useGetUser();

  console.log(userAuth);

  return <RouterProvider router={router} />;
};
