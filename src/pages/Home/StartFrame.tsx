import { Button, Radio, RadioChangeEvent } from "antd";
import { FC, useState } from "react";
import { useNewGame } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";

type StartFrame = {
  onStart: (difficulty: string) => void
}

export const StartFrame: FC<StartFrame> = ({ onStart }) => {
  const [value, setValue] = useState(1);
  const { mutateAsync: startGame, isPending } = useNewGame();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleStart = () => {
    startGame({
      difficulty: String(value),
    }).then(result => {
      if (result.status === "200") {
        onStart(String(value));
      }
    });
  };

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Radio.Group onChange={onChange} value={value} className="flex flex-col gap-3">
        <Radio value={1}>Обучение</Radio>
        <Radio value={2}>Лёгкий</Radio>
        <Radio value={3}>Средний</Radio>
        <Radio value={4}>Сложный</Radio>
        <Radio value={5}>Безумный</Radio>
      </Radio.Group>
      <Button onClick={handleStart}>Начать игру</Button>
    </div>
  );
};