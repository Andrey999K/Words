import { FC, useEffect, useState } from "react";
import { Button, message, notification } from "antd";
import { useGameStop, useGetHint, useGetUser, useHeartbeat, useNewWord, useSendGuess } from "../../api/api.ts";
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
  const { mutateAsync: gameStop, isPending: isLoadingGameStop } = useGameStop();

  const colorWord = (wordResult: string | number) => {
    const wordResultNumber = Number(wordResult);
    if (wordResultNumber > 1000) return "text-red-500";
    if (wordResultNumber > 100) return "text-orange-500";
    else return "text-green-500";
  };

  const handleOk = () => {
    setIsWin(null);
    gameStop().then(() => {
      onMoveMain();
    });
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
    message.open({
      content: (
        <div className="flex flex-col gap-1 items-center">
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
      duration: 4,
      icon: false,
    });
  };

  const onEnterWord = (value: string) => {
    const findedWord = words.find(word => word.guess === value);
    if (findedWord) {
      notification.info({
        message: <div>Это слово уже было введено. Его номер <b
          className={colorWord(findedWord.result)}>{findedWord.result}</b></div>,
        duration: 999999,
      });
      // message.info(`<div>Это слово уже было введено. Его номер <b>${findedWord.result}</b></div>`);
      return;
    }
    enterWord(value)
      .then(result => {
        const guess = result.data;
        if (guess.result === "not a word") {
          showMessageWithButton(guess.guess);
          // message.error("Такого слова нет");
          return;
        } else if (guess.result === "not your turn!") {
          message.error("Сейчас не твой ход.");
          return;
        }
        const newGuess = {
          id: guess.guess,
          guess: guess.guess,
          result: guess.result,
          pp: guess.pp,
        };
        console.log("newGuess", newGuess);
        if (guess.result === "win!") {
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
      })
      .catch(() => message.error("Произошла непредвиденная ошибка!"));
  };

  useEffect(() => {
    if (heartbeat) {
      const { current_player, players_num, mega_history } = heartbeat;
      setWords(mega_history.map(word => ({ ...word, id: word.guess })));
      // console.log("heartbeat", heartbeat);
      // console.log("heartbeat", heartbeat.current_player);
      // console.log("heartbeat", heartbeat);
      const prevPlayerNumber = (current_player + players_num - 1) % players_num;
      const prevPlayer = heartbeat.gamers.find(gamer => gamer.player_num === prevPlayerNumber)!;
      setCurrentWord(prevPlayer.history[prevPlayer.history.length - 1]);
    }
  }, [heartbeat]);

  if (isLoadingUser && isLoadingGameStop) return <PageLoader />;

  return (
    <>
      {isLoadingHint && <PageLoader />}
      <div className="h-full pt-40 w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch] h-full flex flex-col">
          <div className="flex justify-center mb-4">
            <JoinCode />
          </div>
          <div className="w-full mb-4 flex justify-center items-center gap-3">
            <Button type="primary" onClick={handleOk} className="w-full max-w-[14ch]">Новая игра</Button>
            <Hint onGetHint={handleGetHint} />
          </div>
          <MainInput onEnter={onEnterWord} />
          {currentWord && (
            <div className="mt-2">
              <CardWord data={currentWord} />
            </div>
          )}
          <div
            className="flex flex-col mt-5 w-full gap-2 overflow-auto border-t-[1px] border-[var(--first-gray)] dark:border-[var(--second-gray)] pt-2">
            {
              words.map(word => (
                <CardWord key={word.guess} data={word} fill={true} />
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