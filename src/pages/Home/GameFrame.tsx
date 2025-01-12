import { FC, useEffect, useState } from "react";
import { Button, message } from "antd";
import { useGetHint, useGetUser, useHeartbeat, useNewWord, useSendGuess } from "../../api/api.ts";
import { Guess } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";
import { PageLoader } from "../../components/PageLoader.tsx";
import { HintModal } from "../../components/HintModal.tsx";
import { WinModal } from "./WinModal.tsx";
import { JoinCode } from "./JoinCode.tsx";
import { Hint } from "../../components/Hint.tsx";

type GameFrameProps = {
  onMoveMain: () => void
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain }) => {
  const { mutateAsync: enterWord } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<null | Guess>(null);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);
  const { isLoading: isLoadingUser } = useGetUser();
  const { mutateAsync: getHint, isPending: isLoadingHint } = useGetHint();
  const { data: heartbeat } = useHeartbeat();
  const [hint, setHint] = useState<null | string>(null);
  const { mutateAsync: addNewWord } = useNewWord();

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

  const showMessageWithButton = (word: string) => {
    message.info({
      content: (
        <div className="flex flex-col gap-1 items-start">
          <p>Такого слова нет.</p>
          <p>Это ошибка?</p>
          <Button type="primary" className="!p-1 w-full" onClick={() => {
            message.destroy();
            addNewWord(word).then(() => message.success("Заявка на добавление слова успешно отправлена!"));
          }}>
            Да
          </Button>
        </div>
      ),
      duration: 0,
    });
  };

  const onEnterWord = (value: string) => {
    const findedWord = words.find(word => word.guess === value);
    if (findedWord) {
      message.info(`Это слово уже было введено. Его номер ${findedWord.result}`);
      return;
    }
    enterWord(value).then(result => {
      const guess = result.data;
      if (guess.result === "not a word") {
        console.log("not a word");
        showMessageWithButton(guess.guess);
        // message.error("Такого слова нет");
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
            message.info(`Это слово ты уже вводил. Его номер ${guess.result}`);
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
        message.info(`Это слово уже было введено. Его номер ${guess.result}`);
      }
    });
  };

  useEffect(() => {
    if (heartbeat) {
      setWords(heartbeat?.megaHistory.map(word => ({ ...word, id: word.guess })));
    }
  }, [heartbeat]);

  if (isLoadingUser) return <PageLoader />;

  return (
    <>
      {isLoadingHint && <PageLoader />}
      <div className="h-screen pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch]">
          <div className="flex justify-center mb-4">
            <JoinCode />
          </div>
          <div className="mb-4 flex justify-center items-center gap-3">
            <Button type="primary" onClick={handleOk}>Новая игра</Button>
            <Hint onGetHint={handleGetHint} />
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