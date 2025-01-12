import { Card } from "antd";
import { FC } from "react";
import { Guess } from "../types";
import { useHeartbeat } from "../api/api.ts";

type CardWordProps = {
  data: Guess
}

const colors = ["red", "blue", "stone", "green", "orange", "yellow", "fuchsia", "black"];

export const CardWord: FC<CardWordProps> = ({ data }) => {
  const { data: heartbeat } = useHeartbeat();
  const countGamers = heartbeat?.gamers.length || 0;

  const colorCard = (result: Guess) => {
    // if ("user" in data) {
    //   return data.user === "red" ? "!bg-red-500 !border-red-600" : "!bg-blue-500 !border-blue-600";
    //   // return `!bg-${data.user}-500`;
    // }

    if (countGamers > 1 && data && data.player_num !== undefined) {
      if (Number(data.player_num) > colors.length) {
        console.log("1111");
        return "!bg-yellow-900";
      }
      console.log("2222");
      console.log(data.player_num);
      return `!bg-${colors[data.player_num]}-500 !border-${colors[data.player_num]}-600`;
    }

    const res = Number(result.result);
    if (isNaN(res) || res > 1000) return "!border-red-500 red";
    if (res > 100) return "!border-orange-500 orange";
    else return "!border-green-500 green";
  };

  return (
    <Card className={` ${colorCard(data)} border-2 card-word`}>
      <div className="flex justify-between w-full items-center">
        <span>{data.guess}</span>
        <span>{data.result}</span>
      </div>
    </Card>
  );
};