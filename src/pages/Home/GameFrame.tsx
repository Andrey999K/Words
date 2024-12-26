import { Card, Input } from "antd";
import { mockData } from "./mockData.ts";

export const GameFrame = () => {
  return (
    <div className="h-screen pt-40 w-full flex flex-col items-center">
      <div className="w-full max-w-[60ch]">
        <Input className="w-full" placeholder="Введите слово" />
        <div className="flex flex-col mt-5 w-full gap-2">
          {
            mockData.map(word => (
              <Card key={word.id} className="font-bold border-gray-500 border-2">
                <div className="flex justify-between w-full items-center">
                  <span>{word.word}</span>
                  <span>{word.guess}</span>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
};