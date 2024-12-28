import { Card } from "antd";
import { FC } from "react";
import { Guess } from "../types";

type CardWordProps = {
  data: Guess
}

export const CardWord: FC<CardWordProps> = ({ data }) => {
  const colorCard = (result: string) => {
    const res = Number(result);
    if (isNaN(res) || res > 1000) return "border-red-500";
    if (res > 100) return "border-orange-500";
    else return "border-green-500";
  };

  return (
    <Card className={`font-bold ${colorCard(data.result)} border-2`}>
      <div className="flex justify-between w-full items-center">
        <span>{data.guess}</span>
        <span>{data.result}</span>
      </div>
    </Card>
  );
};