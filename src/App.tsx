import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Page.tsx";
import { Routes } from "./utils/routesConfig.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Scoreboard } from "./pages/Scoreboard/Page.tsx";
import { useGetUser } from "./api/api.ts";
import { PageLoader } from "./components/PageLoader.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";
import { Login } from "./pages/Login/Page.tsx";
import { Registration } from "./pages/Registration/Page.tsx";
import { getDarkTheme } from "./utils/isDarkTheme.ts";
import { ConfigProvider } from "antd";
import { antdThemeConfig } from "./utils/antdThemeConfig.ts";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: Routes.HOME,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: Routes.SCOREBOARD,
        element: (
          <ProtectedRoute>
            <Scoreboard />
          </ProtectedRoute>
        ),
      },
    ],
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
  const [darkTheme, setDarkTheme] = useState<boolean>(getDarkTheme());
  const { isLoading: isLoadingUser } = useGetUser();

  useEffect(() => {
    const body = document.body;
    console.log("darkTheme", darkTheme);
    if (darkTheme) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }, [darkTheme]);

  return (
    <div className={`${darkTheme ? "dark" : ""} w-full h-full`}>
      <ThemeContext.Provider value={{
        darkTheme, setDarkTheme,
      }}>
        <ConfigProvider
          theme={antdThemeConfig(darkTheme)}
        >
          {
            isLoadingUser && <PageLoader />
          }
          <RouterProvider router={router} />
        </ConfigProvider>
      </ThemeContext.Provider>
    </div>
  );
};
