import { FC, useState } from "react";
import { message, Modal } from "antd";
import { useNewGame, useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";
import { PageLoader } from "../../components/PageLoader.tsx";

type GameFrameProps = {
  onMoveMain: () => void,
  difficulty: string
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain, difficulty }) => {
  const { mutateAsync: enterWord } = useSendGuess();
  const { mutateAsync: startGame, isPending: isPendingNewGame } = useNewGame();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<null | Guess>(null);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);

  const handleOk = () => {
    startGame({
      difficulty: String(difficulty),
    }).then(result => {
      if (result.status === "200") {
        setWords([]);
        setIsWin(null);
        setCurrentWord(null);
      }
    });
  };

  const handleCancel = () => {
    setIsWin(null);
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
      const newGuess = {
        id: words.length !== 0 ? words[words.length - 1].id : 1,
        guess: guess.guess,
        result: guess.result,
        pp: guess.pp,
      };
      if (guess.result === "win!") { // "win!" "not a word" ">10000" "123"
        setIsWin(newGuess);
        return;
      }
      if (!words.find(word => word.guess === guess.guess)) {
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

  if (isPendingNewGame) return <PageLoader />;

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
          <div className="flex flex-col mt-5 w-full gap-2 max-h-[calc(100vh*0.7)] overflow-auto">
            {
              words.map(word => (
                <CardWord key={word.id} data={word} />
              ))
            }
          </div>
        </div>
      </div>
      {
        !!isWin && (
          <Modal title="Победа!" open={!!isWin} onOk={handleOk} onCancel={handleCancel} okText="Новая игра"
                 cancelText="Главное меню">
            <p>Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
            <p>Загаданное слово <b>{isWin.guess}</b>.</p>
            <p>Ты получил <b>{isWin.pp}</b> pp.</p>
          </Modal>
        )
      }
    </>
  );
};