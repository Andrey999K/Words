import { FC, useEffect, useState } from "react";
import { Button, message, Tooltip } from "antd";
import { useGetHint, useGetUser, useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";
import { PageLoader } from "../../components/PageLoader.tsx";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { HintModal } from "./HintModal.tsx";
import { WinModal } from "./WinModal.tsx";

type GameFrameProps = {
  onMoveMain: () => void
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain }) => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<null | Guess>(null);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const { mutateAsync: getHint, isPending: isLoadingHint } = useGetHint();
  const [hint, setHint] = useState<null | string>(null);

  const handleOk = () => {
    setIsWin(null);
    onMoveMain();
  };

  const handleGetHint = () => {
    getHint().then(result => {
      setHint(result.data.hint);
    });
  };

  const clearHint = () => {
    setHint(null);
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
    console.log("hint", hint);
  }, [hint]);

  useEffect(() => {
    if (user) {
      setWords(user?.history.map(word => ({ ...word, id: word.guess })));
    }
  }, [user]);

  if (isLoadingUser) return <PageLoader />;

  return (
    <>
      {isLoadingHint && <PageLoader />}
      <div className="h-screen pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch]">
          <div className="mb-4 flex justify-center items-center gap-3">
            <Button type="primary" onClick={handleOk}>Новая игра</Button>
            <div className="flex gap-2 items-center">
              <Button type="primary" onClick={handleGetHint}>Подсказка</Button>
              <Tooltip title="Каждое использование подсказки уменьшает количество очков в 2 раза!">
                <QuestionCircleOutlined className="dark:text-white cursor-pointer" />
              </Tooltip>
            </div>
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
                <CardWord key={word.guess} data={word} />
              ))
            }
          </div>
        </div>
      </div>
      {
        !!isWin && (
          <WinModal data={isWin} onOk={handleOk} />
        )
      }
      {
        !!hint && <HintModal hint={hint} onClose={clearHint} />
      }
    </>
  );
};