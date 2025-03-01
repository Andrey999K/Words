import { useGetUser } from "../../api/api.ts";
import { Button, Input, InputRef } from "antd";
import { useRef, useState } from "react";

const linkTexts = [
  "Пригласить игроков",
  "Ссылка скопирована!",
  "Дважды скопирована!",
  "Трижды скопирована!",
  "Мегаскопировано!",
  "Киберскопировано!",
  "Экстраскопировано!",
  "Суперскопировано!",
  "Супермегаскопировано!",
  "Суперкибермегаскопировано!",
  "ДА ВАЩЕ ИМБА!!!!!!!🔥🔥🔥",
];

export const JoinCode = () => {
  const { data: user } = useGetUser();
  const [countCopyed, setCountCopyed] = useState(0);

  const inputRef = useRef<InputRef>(null);

  const unsecuredCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = `${window.location.origin}?code=${user?.join_code}`;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCountCopyed(prevState => {
        if (prevState === linkTexts.length - 1) {
          return 1;
        } else {
          return prevState + 1;
        }
      });
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  // const handleCopy = async () => {
  //   if (inputRef) {
  //     inputRef.current?.focus();
  //     inputRef.current?.select();
  //     try {
  //       document.execCommand("copy");
  //     } catch (err) {
  //       console.error("Unable to copy to clipboard", err);
  //     }
  //     setCountCopyed(prevState => {
  //       if (prevState === linkTexts.length - 1) {
  //         return 1;
  //       } else {
  //         return prevState + 1;
  //       }
  //     });
  //   }
  // const textToCopy = `${window.location.origin}?code=${user?.join_code}`;
  //
  // try {
  //   await navigator.clipboard.writeText(textToCopy);
  //   setCountCopyed(prevState => {
  //     if (prevState === linkTexts.length - 1) {
  //       return 1;
  //     } else {
  //       return prevState + 1;
  //     }
  //   });
  // } catch (err) {
  //   console.error("Ошибка при копировании текста: ", err);
  // }
  // };

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
    <div>
      <Input
        ref={inputRef}
        value={`${window.location.origin}?code=${user?.join_code}`}
        readOnly
        style={{ width: 320 }}
        className="hidden"
      />
      <Button
        onClick={unsecuredCopyToClipboard}
        type="primary"
        className={`text-sm !lg:text-sm ${countCopyed === linkTexts.length - 1 ? "!bg-red-600" : ""}`}
      >
        {linkTexts[countCopyed]}
      </Button>
    </div>
  );
};