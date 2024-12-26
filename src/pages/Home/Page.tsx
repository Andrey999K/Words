import { Button, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

export const Home = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return <div className="w-full h-screen flex items-center justify-center">
    <div className="flex flex-col gap-4">
      <Radio.Group onChange={onChange} value={value} className="flex flex-col gap-3">
        <Radio value={1}>Обучение</Radio>
        <Radio value={2}>Лёгкий</Radio>
        <Radio value={3}>Средний</Radio>
        <Radio value={4}>Сложный</Radio>
      </Radio.Group>
      <Button>Начать игру</Button>
    </div>
  </div>;
};
