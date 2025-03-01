import { Card } from "antd";
import { FC } from "react";
import { Guess } from "../types";
import { useHeartbeat } from "../api/api.ts";
import { UserOutlined } from "@ant-design/icons";

type CardWordProps = {
  data: Guess,
  multi?: boolean,
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

const colorsBorder = [
  "!border-red-600",
  "!border-blue-600",
  "!border-stone-600",
  "!border-green-600",
  "!border-orange-600",
  "!border-yellow-600",
  "!border-fuchsia-600",
  "!border-black-600",
];

export const CardWord: FC<CardWordProps> = ({ data, multi = false }) => {
  const { data: heartbeat } = useHeartbeat();
  const countGamers = heartbeat?.gamers.length || 0;

  const colorCard = (result: Guess, multi: boolean, fill: boolean = false) => {
    if (multi && countGamers > 1 && data && data.player_num !== undefined) {
      if (Number(data.player_num) > colors.length) {
        return fill ? "!bg-yellow-900" : "!border-yellow-900";
      }
      return fill ? colors[data.player_num] : colorsBorder[data.player_num];
    }

    const res = Number(result.result);
    if (isNaN(res) || res > 1000) return "!border-red-500 red";
    if (res > 100) return "!border-orange-500 orange";
    else return "!border-green-500 green";
  };

  return (
    <Card className={`${colorCard(data, false)} border-2 card-word`}>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          {
            multi && (
              <div
                className={`flex justify-center items-center p-1 rounded-full ${colorCard(data, multi)} bg-green-700 border-4 cursor-pointer text-white`}>
                <UserOutlined className="w-3 h-3" />
              </div>
            )
          }
          <span>{data.guess}</span>
        </div>
        <span>{data.result}</span>
      </div>
    </Card>
  );
};