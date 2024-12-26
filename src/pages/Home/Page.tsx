import { StartFrame } from "./StartFrame.tsx";
import { useState } from "react";
import { GameFrame } from "./GameFrame.tsx";

export const Home = () => {
  const [startGame, setStartGame] = useState(false);

  const onStartGame = () => {
    setStartGame(true);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {
        startGame
          ? <GameFrame />
          : <StartFrame onStart={onStartGame} />
      }
    </div>
  );
};
