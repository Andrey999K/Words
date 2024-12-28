import { StartFrame } from "./StartFrame.tsx";
import { useState } from "react";
import { GameFrame } from "./GameFrame.tsx";

export const Home = () => {
  const [startGame, setStartGame] = useState<null | string>(null);

  const onStartGame = (difficulty: string) => {
    setStartGame(difficulty);
  };

  const onMainMenu = () => {
    setStartGame(null);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {
        startGame
          ? <GameFrame onMoveMain={onMainMenu} difficulty={startGame} />
          : <StartFrame onStart={onStartGame} />
      }
    </div>
  );
};
