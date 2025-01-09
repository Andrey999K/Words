import { StartFrame } from "./StartFrame.tsx";
import { useEffect, useState } from "react";
import { GameFrame } from "./GameFrame.tsx";
import { useGetUser, useHeartbeat, useJoinGame } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { Routes } from "../../utils/routesConfig.ts";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Home = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { isLoading } = useGetUser();
  const { mutateAsync: joinGame } = useJoinGame();
  const { data: heartbeat } = useHeartbeat();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const onStartGame = (value: boolean) => {
    setStartGame(value);
  };

  const onMainMenu = () => {
    setStartGame(false);
  };

  useEffect(() => {
    if (heartbeat && heartbeat.gamers.length !== 0) {
      setStartGame(true);
    }
  }, [heartbeat]);

  useEffect(() => {
    if (code) {
      joinGame(code).then(() => {
        navigate(Routes.HOME);
      });
    }
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {
        startGame
          ? <GameFrame onMoveMain={onMainMenu} />
          : <StartFrame onStart={onStartGame} />
      }
    </div>
  );
};
