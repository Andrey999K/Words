import { FC, useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { useGetUser, useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";

type GameFrameProps = {
  onMoveMain: () => void
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain }) => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<null | Guess>(null);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);
  const { data: user } = useGetUser();

  const handleOk = () => {
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
        id: String(words.length !== 0 ? words[words.length - 1].id : 1),
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

  useEffect(() => {
    if (user && user?.history.length !== 0) {
      setWords(user?.history.map(word => ({ ...word, id: word.guess })));
    }
  }, [user]);

  return (
    <>
      <div className="h-screen pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch]">
          <div className="mb-4 flex justify-center">
            <Button type="primary" onClick={handleOk}>Новая игра</Button>
          </div>
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
          <Modal title="Победа!" open={!!isWin} onOk={handleOk} okText="Новая игра" cancelButtonProps={{ hidden: true }}>
            <p>Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
            <p>Загаданное слово <b>{isWin.guess}</b>.</p>
            <p>Ты получил <b>{isWin.pp}</b> pp.</p>
          </Modal>
        )
      }
    </>
  );
};