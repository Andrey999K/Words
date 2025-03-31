import { Button, Radio, RadioChangeEvent } from "antd";
import { FC, useState } from "react";
import { useNewGame } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { RadioButton } from "../../components/RadioButton.tsx";

const difficulties = [
  {
    number: 1,
    label: "Обучение",
    description: "Тут бы будешь обучаться. Там вообще мегаизи. Слово будет из 10 самых частовтсречающихся существительных в русском языке.",
  },
  {
    number: 2,
    label: "Лёгкий",
    description: "Лайтовый режим для новичков. Слово будет из 100 самых частовтсречающихся существительных в русском языке.",
  },
  {
    number: 3,
    label: "Средний",
    description: "Среднячок. Надо подумать немного. Слово будет из 1000 самых частовтсречающихся существительных в русском языке.",
  },
  {
    number: 4,
    label: "Сложный",
    description:
      "Тут прям тяжело. Режим на подумать. Подойдёт для совместной игры. Слово с IPM выше 1.",
  },
  {
    number: 5,
    label: "Безумный",
    description:
      "Любое слово у которого IPM выше 0.037. Ужасная сложность. " +
      "Не рекомендуется к игре никому. Будьте готовы, если вам выпадут " +
      "какие-нибудь дхритараштра или шпрехшталмейстер.",
  },
];

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
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <p className="dark:text-white text-center">Выберите уровень сложности</p>
      <Radio.Group onChange={onChange} value={value}
                   className="flex flex-col md:flex-row gap-3 w-full justify-between dark:text-white">
        {difficulties.map(difficulty =>
          <RadioButton
            key={difficulty.number}
            value={difficulty.number}
            label={difficulty.label}
            selected={value}
          />,
        )}
      </Radio.Group>
      <p
        className="text-sm md:text-base dark:text-white h-[100px] md:h-[90px]
        inline dark:bg-first-gray p-2 rounded-lg"
      >
        {difficulties[value - 1].description}
      </p>
      <Button type="primary" onClick={handleStart}>Старт</Button>
    </div>
  );
};