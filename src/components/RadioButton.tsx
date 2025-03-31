import { Radio } from "antd";

type RadioButtonProps = {
  value: number,
  label: string,
  selected: number,
}

export const RadioButton = ({ value, label, selected }: RadioButtonProps) => {
  return (
    <Radio.Button
      className={`select-none rounded md:rounded-none dark:text-white ${selected === value ? "dark:bg-first-gray" : "dark:bg-second-gray"}`}
      value={value}
    >{label}</Radio.Button>
  );
};