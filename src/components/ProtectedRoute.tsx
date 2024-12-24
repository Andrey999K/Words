import { FC, ReactNode } from "react";
import { useGetUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Navigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data: userAuth, isLoading } = useGetUser();
  if (isLoading) return <PageLoader />;
  if (
    userAuth &&
    "comment" in userAuth &&
    userAuth.comment === "Non authorized"
  ) {
    return <Navigate to={Routes.LOGIN} />;
  }
  return <>{children}</>;
};
