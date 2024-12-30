import { Card } from "antd";
import { FC } from "react";
import { Guess } from "../types";

type CardWordProps = {
  data: Guess
}

export const CardWord: FC<CardWordProps> = ({ data }) => {
  const colorCard = (result: string) => {
    const res = Number(result);
    if (isNaN(res) || res > 1000) return "!border-red-500 red";
    if (res > 100) return "!border-orange-500 orange";
    else return "!border-green-500 green";
  };

  return (
    <Card className={` ${colorCard(data.result)} border-2 card-word`}>
      <div className="flex justify-between w-full items-center">
        <span>{data.guess}</span>
        <span>{data.result}</span>
      </div>
    </Card>
  );
};