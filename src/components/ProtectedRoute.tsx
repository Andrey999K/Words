import { FC } from "react";
import { useGetUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Navigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { Header } from "./Header.tsx";
import { RouteProps } from "../types";

export const ProtectedRoute: FC<RouteProps> = ({ children }) => {
  const { data: user, isLoading } = useGetUser();

  console.log("ProtectedRoute: user", user);

  if (isLoading) return <PageLoader />;
  if (user && "id" in user) {
    return (
      <div className="h-screen w-full">
        <Header />
        <div className="flex h-full justify-center">
          {children}
        </div>
      </div>
    );
  }

  return <Navigate to={Routes.LOGIN} />;
  // if (
  //   user &&
  //   "comment" in user &&
  //   user.comment === "Non authorized"
  // ) {
  //   return <Navigate to={Routes.LOGIN} />;
  // }

};
