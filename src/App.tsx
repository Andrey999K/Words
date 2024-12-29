import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Page.tsx";
import { Home } from "./pages/Home/Page.tsx";
import { Routes } from "./utils/routesConfig.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Registration } from "./pages/Registration/Page.tsx";
import { ConfigProvider } from "antd";
import { createContext, Dispatch, SetStateAction, useState } from "react";

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
    element: (
      <Login />
    ),
  },
  {
    path: Routes.REGISTRATION,
    element: (
      <Registration />
    ),
  },
]);

export const ThemeContext = createContext<undefined | {
  darkTheme: boolean, setDarkTheme: Dispatch<SetStateAction<boolean>>
}>(undefined);

export const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <ThemeContext.Provider value={{
        darkTheme, setDarkTheme
      }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "green"
            }
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </ThemeContext.Provider>
    </div>
  );
};
