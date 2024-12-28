import { Input } from "antd";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

type MainInputProps = {
  onEnter: (value: string) => void;
}

export const MainInput: FC<MainInputProps> = ({ onEnter }) => {
  const [value, setValue] = useState("");

  const handleEnterWord = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputValue =
        (event.target as HTMLInputElement).value
          .toLowerCase()
          .replace("ё", "е");
      onEnter(inputValue);
      setValue("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      value={value}
      className="w-full"
      placeholder="Введите слово"
      onChange={handleChange}
      onKeyPress={handleEnterWord}
    />
  );
};