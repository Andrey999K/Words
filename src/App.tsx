import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login/Page.tsx";
import { Home } from "./pages/Home/Page.tsx";
import { Routes } from "./utils/routesConfig.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Registration } from "./pages/Registration/Page.tsx";
import { ConfigProvider } from "antd";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Scoreboard } from "./pages/Scoreboard/Page.tsx";
import { useGetUser } from "./api/api.ts";
import { PageLoader } from "./components/PageLoader.tsx";
import { GamePage } from "./pages/GamePage/Page.tsx";

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
    path: Routes.SCOREBOARD,
    element: (
      <ProtectedRoute>
        <Scoreboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "game/:gameId",
    element: (
      <ProtectedRoute>
        <GamePage />
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

const getDarkTheme = () => {
  const darkTheme = localStorage.getItem("dark");
  if (darkTheme === null) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return JSON.parse(darkTheme);
};

export const ThemeContext = createContext<undefined | {
  darkTheme: boolean, setDarkTheme: Dispatch<SetStateAction<boolean>>
}>(undefined);

export const App = () => {
  const [darkTheme, setDarkTheme] = useState(getDarkTheme());
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
    <div className={darkTheme ? "dark" : ""}>
      <ThemeContext.Provider value={{
        darkTheme, setDarkTheme,
      }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "green",
            },
          }}
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
