import { StartFrame } from "./StartFrame.tsx";
import { useState } from "react";
import { GameFrame } from "./GameFrame.tsx";

export const Home = () => {
  const [startGame, setStartGame] = useState(false);

  const onStartGame = () => {
    setStartGame(true);
  };

  const onMainMenu = () => {
    setStartGame(false);
  };

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
