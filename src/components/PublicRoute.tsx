import { useGetUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Navigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { FC } from "react";
import { RouteProps } from "../types";

export const PublicRoute: FC<RouteProps> = ({ children }) => {
  const { data: userAuth, isLoading } = useGetUser();

  if (isLoading) return <PageLoader />;
  if (!userAuth || !("id" in userAuth)) {
    return children;
  }

  return <Navigate to={Routes.HOME} />;
};