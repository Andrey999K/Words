import { useGetUser } from "../../api/api.ts";
import { Button, Input } from "antd";
import { useRef, useState } from "react";

export const JoinCode = () => {
  const { data: user } = useGetUser();
  const [buttonText, setButtonText] = useState("Скопировать ссылку для присоединения игроков");

  const inputRef = useRef<HTMLInputElement | null>();

  const handleCopy = () => {
    if (inputRef) {
      inputRef.current?.select();
      document.execCommand("copy");
      setButtonText("Cкопировано!");
    }
  };

  // const textToCopy = "Текст, который нужно скопировать";
  //
  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(textToCopy);
  //     alert("Текст скопирован в буфер обмена!");
  //   } catch (err) {
  //     console.error("Ошибка при копировании текста: ", err);
  //   }
  // };

  return (
    <div className="fixed top-24 md:right-20 z-[9999]">
      <Input
        ref={inputRef}
        value={`${window.location.origin}?code=${user?.join_code}`}
        readOnly
        style={{ width: 320 }}
        className="hidden"
      />
      <Button
        onClick={handleCopy}
        type="primary"
        className="text-xs md:text-sm"
      >
        {buttonText}
      </Button>
    </div>
  );
};