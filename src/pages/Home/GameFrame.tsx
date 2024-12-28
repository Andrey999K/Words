import { FC, useState } from "react";
import { message, Modal } from "antd";
import { useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";

type GameFrameProps = {
  onMoveMain: () => void
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain }) => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<boolean | string>(false);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);

  const handleOk = () => {
    setIsWin(false);
  };

  const handleCancel = () => {
    setIsWin(false);
    onMoveMain();
  };

  const onEnterWord = (value: string) => {
    enterWord(value).then(result => {
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
      if (!words.find(word => word.guess === guess.guess)) {
        const newGuess = {
          id: words.length !== 0 ? words[words.length - 1].id : 1,
          guess: guess.guess,
          result: guess.result,
        };
        setCurrentWord(newGuess);
        if (guess.result.startsWith(">")) {
          if (words.find(word => word.result === guess.guess)) {
            message.error("Это слово ты уже вводил");
            return;
          }
          setWords([...words, newGuess]);
          return;
        }
        const newMass = [...words.filter(word => !word.result.startsWith(">")), newGuess, ...words.filter(word => word.result.startsWith(">"))].sort((a, b) => {
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
      } else {
        message.error("Это слово уже было введено");
      }
    });
  };

  return (
    <>
      <div className="h-screen pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch]">
          <MainInput onEnter={onEnterWord} />
          {currentWord && (
            <div className="mt-2">
              <CardWord data={currentWord} />
            </div>
          )}
          <div className="flex flex-col mt-5 w-full gap-2">
            {
              words.map(word => (
                <CardWord key={word.id} data={word} />
              ))
            }
          </div>
        </div>
      </div>
      <Modal title="Победа!" open={!!isWin} onOk={handleOk} onCancel={handleCancel} okText="Новая игра"
             cancelText="Главное меню">
        <p>Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
        <p>Ты получил <b>{isWin}</b> pp.</p>
      </Modal>
    </>
  );
};