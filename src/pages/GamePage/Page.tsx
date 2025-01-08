import { useParams } from "react-router-dom";
import { MultiGameFrame } from "./MultiGameFrame.tsx";

export const GamePage = () => {
  const { gameId } = useParams();

  return (
    <div className="flex flex-col">
      <MultiGameFrame />
      <h2 className="font-semibold text-xl">Game {gameId}</h2>
    </div>
  );
};