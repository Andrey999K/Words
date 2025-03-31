import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.tsx";

export const PageLayout = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-40 relative h-screen overflow-hidden">
      <Header />
      <div className="w-full h-full px-5 pb-20">
        <div className="w-full flex h-full justify-center">
          <div className="w-full h-full max-w-screen-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};