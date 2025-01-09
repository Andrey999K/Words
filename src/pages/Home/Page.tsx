import { StartFrame } from "./StartFrame.tsx";
import { useEffect, useState } from "react";
import { GameFrame } from "./GameFrame.tsx";
import { useGetUser, useJoinGame } from "../../api/api.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "../../utils/routesConfig.ts";

export const Home = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { data: user } = useGetUser();
  const { mutateAsync: joinGame } = useJoinGame();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const onStartGame = (value: boolean) => {
    setStartGame(value);
  };

  const onMainMenu = () => {
    setStartGame(false);
  };

  useEffect(() => {
    if (code) {
      joinGame(code).then(() => {
        navigate(Routes.HOME);
      });
    }
  }, []);

  useEffect(() => {
    if (user?.history.length !== 0) {
      setStartGame(true);
    }
  }, [user]);

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
