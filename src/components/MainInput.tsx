import { Input, Spin } from "antd";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type MainInputProps = {
  onEnter: (value: string) => void;
  isLoading?: boolean;
}

export const MainInput = ({ onEnter, isLoading }: MainInputProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<any>(null);

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

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  return (
    <div className="relative h-full max-h-[30px]">
      <Input
        value={value}
        className="w-full absolute"
        // placeholder={"Введите слово"}
        placeholder={isLoading ? "" : "Введите слово"}
        onChange={handleChange}
        onKeyPress={handleEnterWord}
        disabled={isLoading}
        ref={inputRef}
      />
      {
        isLoading && (
          <div className="absolute flex items-center pl-3 py-2">
            <Spin className="" indicator={<LoadingOutlined spin />} size="small" />
          </div>
        )
      }
    </div>

  );
};