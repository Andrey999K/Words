import { StartFrame } from "./StartFrame.tsx";
import { useEffect, useState } from "react";
import { GameFrame } from "./GameFrame.tsx";
import { useGetUser } from "../../api/api.ts";

export const Home = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { data: user } = useGetUser();

  const onStartGame = (value: boolean) => {
    setStartGame(value);
  };

  const onMainMenu = () => {
    setStartGame(false);
  };

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
