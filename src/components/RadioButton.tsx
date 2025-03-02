import { Radio } from "antd";

type RadioButtonProps = {
  value: number,
  label: string,
  selected: number,
}

export const RadioButton = ({ value, label, selected }: RadioButtonProps) => {
  return (
    <Radio.Button
      className={`dark:text-white ${selected === value ? "!bg-first-gray" : "bg-second-gray"}`}
      value={value}
    >{label}</Radio.Button>
  );
};