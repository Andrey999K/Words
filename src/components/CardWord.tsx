import { Card } from "antd";
import { FC } from "react";
import { Guess } from "../types";
import { useHeartbeat } from "../api/api.ts";

type CardWordProps = {
  data: Guess
}

const colors = [
  "!bg-red-500 !border-red-600",
  "!bg-blue-500 !border-blue-600",
  "!bg-stone-500 !border-stone-600",
  "!bg-green-500 !border-green-600",
  "!bg-orange-500 !border-orange-600",
  "!bg-yellow-500 !border-yellow-600",
  "!bg-fuchsia-500 !border-fuchsia-600",
  "!bg-black-500 !border-black-600",
];

export const CardWord: FC<CardWordProps> = ({ data }) => {
  const { data: heartbeat } = useHeartbeat();
  const countGamers = heartbeat?.gamers.length || 0;

  const colorCard = (result: Guess) => {
    if (countGamers > 1 && data && data.player_num !== undefined) {
      if (Number(data.player_num) > colors.length) {
        return "!bg-yellow-900";
      }
      return colors[data.player_num];
    }

    const res = Number(result.result);
    if (isNaN(res) || res > 1000) return "!border-red-500 red";
    if (res > 100) return "!border-orange-500 orange";
    else return "!border-green-500 green";
  };

  return (
    <Card className={`${colorCard(data)} border-2 card-word`}>
      <div className="flex justify-between w-full items-center">
        <span>{data.guess}</span>
        <span>{data.result}</span>
      </div>
    </Card>
  );
};