import { Button, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { useNewGame } from "../../api/api.ts";

export const StartFrame = () => {
  const [value, setValue] = useState(1);
  const { mutateAsync: startGame } = useNewGame();

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleStart = () => {
    startGame({
      difficulty: String(value),
    }).then(result => {
      console.log("result", result);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Radio.Group onChange={onChange} value={value} className="flex flex-col gap-3">
        <Radio value={1}>Обучение</Radio>
        <Radio value={2}>Лёгкий</Radio>
        <Radio value={3}>Средний</Radio>
        <Radio value={4}>Сложный</Radio>
      </Radio.Group>
      <Button onClick={handleStart}>Начать игру</Button>
    </div>
  );
};