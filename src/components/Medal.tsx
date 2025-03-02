import chocolateMedal from "../assets/medals/m0_chocolate.svg";
import bronzeMedal from "../assets/medals/m1_bronze.svg";
import silverMedal from "../assets/medals/m2_silver.svg";
import goldMedal from "../assets/medals/m3_gold.svg";
import diamondMedal from "../assets/medals/m4_diamond.svg";
import chromaticMedal from "../assets/medals/m5_chromatic.svg";
import { Tooltip } from "antd";

const medalsList = {
  chocolate: {
    src: chocolateMedal,
    alt: "chocolate medal",
    description: "Шоколадная медаль. " +
      "На вкус как шоколад, немного тает. " +
      "Настоящий знак почета маленьких начинашек. Загаданное слово " +
      "встречается чаще 1 раза на тысячу слов.",
  },
  bronze: {
    src: bronzeMedal,
    alt: "bronze medal",
    description: "Бронзовая медаль. Сделана из сплава меди и олова. " +
      "Еле блестит на солнце. Загаданное слово встречается чаще 1 раза " +
      "на 4 тысячи слов.",
  },
  silver: {
    src: silverMedal,
    alt: "silver medal",
    description: "Серебрянная медаль. Сделана из благородного металла. " +
      "Кажется можно увидеть собственное отражение. Загаданное слово " +
      "встречается чаще 1 раза на 20 тысяч слов.",
  },
  gold: {
    src: goldMedal,
    alt: "gold medal",
    description: "Золотая медаль. Остаются следы от зубов. " +
      "Неоспоримое достижение для любого человека. Загаданное " +
      "слово встречается чаще 1 раза на 300 тысяч слов.",
  },
  diamond: {
    src: diamondMedal,
    alt: "diamond medal",
    description: "Алмазная медаль. Больше 100 млн лет в разработке, " +
      "очень твёрдая. Лишь единицы достигают таких высот. Загаданное " +
      "слово встречается чаще 1 раза на 20 миллионов слов.",
  },
  chromatic: {
    src: chromaticMedal,
    alt: "chromatic medal",
    description: "Хроматическая медаль. " +
      "Никто не знает из чего она сделана. " +
      "Выглядит как отражение вселенной. " +
      "Высшая степень мастерства. " +
      "Загаданное слово было встречено на просторах интернета хотя бы раз.",
  },
};

type MedalProps = {
  type: "chocolate" | "bronze" | "silver" | "gold" | "diamond" | "chromatic",
}

export const Medal = ({ type }: MedalProps) => {
  const { src, alt, description } = medalsList[type];

  return (
    <Tooltip className="h-full cursor-pointer" title={description}>
      <img src={src} alt={alt} />
    </Tooltip>
  );
};