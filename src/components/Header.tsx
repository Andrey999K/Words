import { useGetUser, useLogoutUser } from "../api/api.ts";
import { PageLoader } from "./PageLoader.tsx";
import { Button, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { SwitchTheme } from "./SwitchTheme.tsx";
import { useContext } from "react";
import { ThemeContext } from "../App.tsx";

export const Header = () => {
  const { data: user, isLoading } = useGetUser();
  const { mutateAsync: logoutUser } = useLogoutUser();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const handleExit = () => {
    logoutUser().then(result => {
      console.log(result);
      navigate(Routes.LOGIN);
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="text-white w-full flex justify-between gap-3">
          <span className="font-semibold">Username</span>
          <span>{user?.username}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-white w-full flex justify-between gap-3">
          <span className="font-semibold">Pp</span>
          <span>{user?.pp}</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to={Routes.HOME}
                 className={({ isActive, isPending }) =>
                   (isPending ? "pending" : isActive ? "!text-green-700 !dark:text-green-900 !font-medium" : " !dark:text-white")
                 }
        >
          Главная
        </NavLink>
      ),
    },
    {
      key: "4",
      label: (
        <NavLink to={Routes.SCOREBOARD}
                 className={({ isActive, isPending }) =>
                   (isPending ? "pending" : isActive ? "!text-green-700 !dark:text-green-900 !font-medium" : " !dark:text-white")
                 }
        >
          Scoreboard
        </NavLink>
      ),
    },
    {
      key: "5",
      label: (
        <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 dark:text-white">
          <span>Тёмная тема</span>
          <SwitchTheme />
        </div>
      ),
    },
    {
      key: "6",
      label: <Button type="primary" onClick={handleExit}>Выход</Button>,
    },
  ];

  if (isLoading || !user) return <PageLoader />;

  return (
    <div className="absolute top-0 p-5 flex w-full justify-end">
      <div className="dark:text-white flex gap-1 items-center">
        <span>{user.email}</span>
        <Dropdown menu={{ items }} placement="bottomLeft" overlayClassName={theme?.darkTheme ? `dark` : ""}>
          <div className="flex justify-center items-center p-2 rounded-full bg-green-700 cursor-pointer text-white">
            <UserOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};