import chocolateMedal from "../assets/medals/m0_chocolate.svg";
import bronzeMedal from "../assets/medals/m1_bronze.svg";
import silverMedal from "../assets/medals/m2_silver.svg";
import goldMedal from "../assets/medals/m3_gold.svg";
import diamondMedal from "../assets/medals/m4_diamond.svg";
import chromaticMedal from "../assets/medals/m5_chromatic.svg";
import unobtaniumMedal from "../assets/medals/m6_unobtanium.svg";
import { Tooltip } from "antd";
import { MedalTypes } from "../types";

const medalsList = {
  chocolate: {
    src: chocolateMedal,
    alt: "chocolate medal",
    description: (
      <div className="flex flex-col">
        <p>
          Шоколадная медаль. На вкус как шоколад, немного тает.
          Настоящий знак почета маленьких начинашек.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное слово
          встречается чаще 1 раза на тысячу слов.
        </i>
        <i className="text-[10px] text-gray-400">
          Можно использовать сколько угодно подсказок.
        </i>
      </div>
    ),
  },
  bronze: {
    src: bronzeMedal,
    alt: "bronze medal",
    description:
      <div className="flex flex-col">
        <p>
          Бронзовая медаль. Сделана из сплава меди и олова.
          Еле блестит на солнце.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное слово встречается чаще 1 раза
          на 4 тысячи слов.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль можно использовать не более 3 подсказок.
        </i>
      </div>,
  },
  silver: {
    src: silverMedal,
    alt: "silver medal",
    description:
      <div className="flex flex-col">
        <p>
          Серебрянная медаль. Сделана из благородного металла.
          Кажется можно увидеть собственное отражение. Загаданное слово
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное слово встречается чаще 1 раза на 20 тысяч слов.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль можно использовать не более 3 подсказок.
        </i>
      </div>,
  },
  gold: {
    src: goldMedal,
    alt: "gold medal",
    description:
      <div className="flex flex-col">
        <p>
          Золотая медаль. Остаются следы от зубов.
          Неоспоримое достижение для любого человека.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное
          слово встречается чаще 1 раза на 300 тысяч слов.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль можно использовать не более 3 подсказок.
        </i>
      </div>,
  },
  diamond: {
    src: diamondMedal,
    alt: "diamond medal",
    description:
      <div className="flex flex-col">
        <p>
          Алмазная медаль. Больше 100 млн лет в разработке,
          очень твёрдая. Лишь единицы достигают таких высот.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное
          слово встречается чаще 1 раза на 20 миллионов слов.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль можно использовать не более 3 подсказок.
        </i>
      </div>,
  },
  chromatic: {
    src: chromaticMedal,
    alt: "chromatic medal",
    description:
      <div className="flex flex-col">
        <p>
          Хроматическая медаль.
          Никто не знает из чего она сделана.
          Выглядит как отражение вселенной.
          Высшая степень мастерства.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное слово было встречено на просторах интернета хотя бы раз.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль можно использовать не более 3 подсказок.
        </i>
      </div>,
  },
  unobtanium: {
    src: unobtaniumMedal,
    alt: "unobtanium medal",
    description:
      <div className="flex flex-col">
        <p>
          Медаль из анабтаниума.
          Когда мастерство становится искусством.
        </p>
        <i className="text-[10px] text-gray-400 mt-1">
          Загаданное слово было встречено на просторах интернета хотя бы раз.
        </i>
        <i className="text-[10px] text-gray-400">
          Чтобы получить медаль нельзя использовать подсказки и количество
          попыток ограничено.
        </i>
      </div>,
  },
};

type MedalProps = {
  type: MedalTypes,
}

export const Medal = ({ type }: MedalProps) => {
  const { src, alt, description } = medalsList[type];

  return (
    <Tooltip
      className="h-full cursor-pointer max-h-full"
      title={description}
    >
      <img src={src} alt={alt} />
    </Tooltip>
  );
};