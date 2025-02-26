import { FC } from "react";
import { useGetUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Navigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { RouteProps } from "../types";

export const ProtectedRoute: FC<RouteProps> = ({ children }) => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return <PageLoader />;
  return user && "id" in user ? children : <Navigate to={Routes.LOGIN} />;
};
