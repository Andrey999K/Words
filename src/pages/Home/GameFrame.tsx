import { KeyboardEvent, useState } from "react";
import { Card, Input, message, Modal } from "antd";
import { useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";

export const GameFrame = () => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<boolean | string>(false);

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
        (event.target as HTMLInputElement).value = "";
        const guess = result.data;
        if (guess.result === "not a word") {
          console.log("not a word");
          message.error("Такого слова нет");
          return;
        }
        if (guess.result === "win!") { // "win!" "not a word" ">10000" "123"
          setIsWin(guess.pp);
          return;
        }
        const newGuess = {
          id: words.length !== 0 ? words[words.length - 1].id : 1,
          guess: guess.guess,
          result: guess.result,
        };
        if (guess.result === ">10000") {
          if (words.find(word => word.result === guess.guess)) {
            message.error("Это слово ты уже вводил");
            return;
          }
          setWords([...words, newGuess]);
          return;
        }
        const newMass = [...words, newGuess].sort((a, b) => {
          const numberA = Number(a.result);
          const numberB = Number(b.result);
          if (numberA < numberB) {
            return -1;
          } else if (numberA > numberB) {
            return 1;
          } else {
            return 0;
          }
        });
        setWords(newMass);
      });
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
      <Modal title="Победа!" open={!!isWin} onOk={handleOk} onCancel={handleCancel} okText="Новая игра"
             cancelText="Главное меню">
        <p>Ты угадал, ой, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
        <p>Ты получил <b>{isWin}</b> pp.</p>
      </Modal>
    </>
  );
};