import { Button, Radio, RadioChangeEvent } from "antd";
import { FC, useState } from "react";
import { useNewGame } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";

type StartFrame = {
  onStart: (value: boolean) => void
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
        onStart(true);
      }
    });
  };

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Radio.Group onChange={onChange} value={value} className="flex flex-col gap-3 dark:text-white">
        <Radio className="dark:text-white" value={1}>Обучение</Radio>
        <Radio className="dark:text-white" value={2}>Лёгкий</Radio>
        <Radio className="dark:text-white" value={3}>Средний</Radio>
        <Radio className="dark:text-white" value={4}>Сложный</Radio>
        <Radio className="dark:text-white" value={5}>Безумный</Radio>
      </Radio.Group>
      <Button type="primary" onClick={handleStart}>Начать игру</Button>
    </div>
  );
};