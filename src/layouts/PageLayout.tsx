import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.tsx";

export const PageLayout = () => {
  return (
    <div className="min-h-screen relative h-screen overflow-hidden">
      <Header />
      <div className="w-full h-full px-5 pb-5">
        <div className="w-full flex h-full justify-center">
          <div className="w-full h-full max-w-screen-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};