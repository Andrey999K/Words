import { StartFrame } from "./StartFrame.tsx";
import { useEffect, useLayoutEffect, useState } from "react";
import { GameFrame } from "./GameFrame.tsx";
import { useGetUser, useHeartbeat, useJoinGame } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { Routes } from "../../utils/routesConfig.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { notification } from "antd";

export const Home = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { isLoading: isLoadingUser } = useGetUser();
  const { mutateAsync: joinGame, isPending: isLoadingJoin } = useJoinGame();
  const { data: heartbeat, isLoading: isLoadingHeartbeat } = useHeartbeat();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const onStartGame = (value: boolean) => {
    setStartGame(value);
  };

  const onMainMenu = () => {
    setStartGame(false);
  };

  useLayoutEffect(() => {
    if (heartbeat && "game_id" in heartbeat && heartbeat.game_id !== -1) {
      setStartGame(true);
    }
  }, [heartbeat]);

  useEffect(() => {
    if (code) {
      joinGame(code).then((response) => {
        if (response.status === "409") {
          notification.error({ message: "Игра уже начата!" });
        } else if (response.status === "410") {
          notification.error({ message: "Игра уже закончилась!" });
        }
        navigate(Routes.HOME);
      });
    }
  }, []);

  usePageTitle("");

  if (
    (heartbeat && !("game_id" in heartbeat))
    || isLoadingUser
    || isLoadingJoin
    || isLoadingHeartbeat
    || (startGame && heartbeat && heartbeat.game_id === -1)
  )
    return <PageLoader />;

  console.log((heartbeat && !("game_id" in heartbeat)),
    isLoadingUser,
    isLoadingJoin,
    isLoadingHeartbeat,
    (startGame && heartbeat && heartbeat.game_id === -1));

  return (
    <div className="w-full h-full flex items-center justify-center">
      {
        startGame
          ? (
            heartbeat && "game_id" in heartbeat && heartbeat.game_id !== -1
              ? <GameFrame onMoveMain={onMainMenu} />
              : <PageLoader />
          )
          : <StartFrame onStart={onStartGame} />
      }
    </div>
  );
};
