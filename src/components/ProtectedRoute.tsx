import { FC, ReactNode } from "react";
import { useGetUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Navigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { Header } from "./Header.tsx";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data: userAuth, isLoading } = useGetUser();

  if (isLoading) return <PageLoader />;
  if (userAuth && "id" in userAuth) {
    return <div className="h-screen w-full">
      <Header />
      <div className="flex h-full justify-center">
        {children}
      </div>
    </div>;
  }

  return <Navigate to={Routes.LOGIN} />;
  // if (
  //   userAuth &&
  //   "comment" in userAuth &&
  //   userAuth.comment === "Non authorized"
  // ) {
  //   return <Navigate to={Routes.LOGIN} />;
  // }

};
