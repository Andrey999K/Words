import { KeyboardEvent, useState } from "react";
import { Card, Input, Modal } from "antd";
import { useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";

export const GameFrame = () => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState(false);

  const handleOk = () => {
    setIsWin(false);
  };

  const handleCancel = () => {
    setIsWin(false);
  };

  const onEnterWord = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputValue =
        (event.target as HTMLInputElement).value
          .toLowerCase()
          .replace("ё", "е");
      enterWord(inputValue).then(result => {
        const guess = result.data;
        if (guess.result === "not a word") {
          console.log("not a word");
          return;
        }
        if (guess.result === "win!") { // "win!" "not a word" ">10000" "123"
          setIsWin(true);
          console.log("Ты выиграл!");
          return;
        }
        setWords(Array.from(new Set([...words, {
          id: words.length !== 0 ? words[words.length - 1].id : 1,
          guess: guess.guess,
          result: guess.result,
        }])));
      });
      (event.target as HTMLInputElement).value = "";
    }
  };

  return (
    <>
      <div className="h-screen pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch]">
          <Input
            className="w-full"
            placeholder="Введите слово"
            onKeyPress={onEnterWord}
          />
          <div className="flex flex-col mt-5 w-full gap-2">
            {
              words.map(word => (
                <Card key={word.id} className="font-bold border-gray-500 border-2">
                  <div className="flex justify-between w-full items-center">
                    <span>{word.guess}</span>
                    <span>{word.result}</span>
                  </div>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
      <Modal title="Basic Modal" open={isWin} onOk={handleOk} onCancel={handleCancel} okText="Новая игра"
             cancelText="Главное меню">
        Ты угадал, ой, красава, мэээээээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪
      </Modal>
    </>
  );
};