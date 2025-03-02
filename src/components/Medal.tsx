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
    description: "Информация о медалях будет позже",
  },
  bronze: {
    src: bronzeMedal,
    alt: "bronze medal",
    description: "Информация о медалях будет позже",
  },
  silver: {
    src: silverMedal,
    alt: "silver medal",
    description: "Информация о медалях будет позже",
  },
  gold: {
    src: goldMedal,
    alt: "gold medal",
    description: "Информация о медалях будет позже",
  },
  diamond: {
    src: diamondMedal,
    alt: "diamond medal",
    description: "Информация о медалях будет позже",
  },
  chromatic: {
    src: chromaticMedal,
    alt: "chromatic medal",
    description: "Информация о медалях будет позже",
  },
};

type MedalProps = {
  type: "chocolate" | "bronze" | "silver" | "gold" | "diamond" | "chromatic",
}

export const Medal = ({ type }: MedalProps) => {
  const { src, alt, description } = medalsList[type];

  return (
    <Tooltip className="h-full cursor-pointer" title="Информация о медалях будет позже">
      <img src={src} alt={alt} className={description} />
    </Tooltip>
  );
};