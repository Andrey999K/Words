import sprite from "../../../img/sprite.svg";
import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = "", ...props }: IconProps) => (
  <svg className={`icon w-[22px] h-[22px] ${className}`} {...props}>
    <use xlinkHref={`${sprite}#${name}`} />
  </svg>
);