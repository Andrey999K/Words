import { FC, useEffect, useState } from "react";
import { Button, message, notification } from "antd";
import {
  keys,
  queryClient,
  useGameStop,
  useGetHint,
  useGetUser,
  useHeartbeat,
  useNewWord,
  useSendGuess,
} from "../../api/api.ts";
import { Guess, MedalTypes } from "../../types";
import { MainInput } from "../../components/MainInput.tsx";
import { CardWord } from "../../components/CardWord.tsx";
import { PageLoader } from "../../components/PageLoader.tsx";
import { HintModal } from "../../components/HintModal.tsx";
import { WinModal } from "./WinModal.tsx";
import { JoinCode } from "./JoinCode.tsx";
import { Hint } from "../../components/Hint.tsx";
import { Medal } from "../../components/Medal.tsx";
import { HeartbeatUser } from "../../api/types.ts";

type GameFrameProps = {
  onMoveMain: () => void
}

export const GameFrame: FC<GameFrameProps> = ({ onMoveMain }) => {
  const { mutateAsync: enterWord, isPending: isLoadingGuess } = useSendGuess();
  const [words, setWords] = useState<Guess[]>([]);
  const [isWin, setIsWin] = useState<null | Guess>(null);
  const [currentWord, setCurrentWord] = useState<null | Guess>(null);
  const { data: currentUser, isLoading: isLoadingUser } = useGetUser();
  const { mutateAsync: getHint, isPending: isLoadingHint } = useGetHint();
  const { data: heartbeat } = useHeartbeat();
  const [hint, setHint] = useState<null | string>(null);
  const { mutateAsync: addNewWord } = useNewWord();
  const { mutateAsync: gameStop, isPending: isLoadingGameStop } = useGameStop();
  const [currentPlayers, setCurrentPlayers] = useState<HeartbeatUser[] | null>(null);
  const [medal, setMedal] = useState<MedalTypes | "">("");

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
          <p>Добавить слово <b>{word}</b>?</p>
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
    const valueTrim = value.trim();
    const findedWord = words.find(word => word.guess === valueTrim);
    if (findedWord) {
      notification.info({
        message: <div>Это слово уже было введено. Его номер <b
          className={colorWord(findedWord.result)}>{findedWord.result}</b></div>,
      });
      return;
    }
    enterWord(valueTrim)
      .then(result => {
        const guess = result.data;
        if (guess.result === "not a word") {
          showMessageWithButton(guess.guess);
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
      const {
        current_player,
        players_num,
        mega_history,
        gamers,
        ended,
        game_word,
        pp,
      } = heartbeat;
      if (ended) {
        const newGuess = {
          id: game_word,
          guess: game_word,
          result: "0",
          pp,
        };
        setIsWin(newGuess);
        return;
      }
      if (players_num > 0) {
        if (mega_history.length > 0) {
          setWords(mega_history.map(word => ({ ...word, id: word.guess })));
          const prevPlayerNumber = (current_player + players_num - 1) % players_num;
          const prevPlayer = heartbeat.gamers.find(gamer => gamer.player_num === prevPlayerNumber)!;
          if (prevPlayer.history.length > 0) {
            setCurrentWord(prevPlayer.history[prevPlayer.history.length - 1]);
          }
        } else {
          if (currentPlayers && gamers.length > 1 && currentPlayers.length !== players_num) {
            const lastUser = gamers[gamers.length - 1].email;
            if (currentUser?.email !== lastUser) {
              notification.info({ message: `Игрок ${lastUser} вступил в игру!` });
            }
          }
          setWords([]);
          setCurrentWord(null);
          setCurrentPlayers(gamers);
        }
      }
    }
  }, [heartbeat]);

  useEffect(() => {
    if (heartbeat) {
      setMedal(heartbeat.medal);
    }
  }, [heartbeat]);

  useEffect(() => {
    if (isWin) {
      queryClient.invalidateQueries({ queryKey: [keys.user] });
    }
  }, [isWin]);

  if (isLoadingUser || isLoadingGameStop || !(heartbeat && "game_id" in heartbeat)) return <PageLoader />;

  return (
    <>
      {isLoadingHint && <PageLoader />}
      <div className="h-full w-full flex flex-col items-center">
        <div className="w-full max-w-[60ch] h-full flex flex-col">
          <div className="flex justify-center mb-4">
            <JoinCode />
          </div>
          <div className="w-full mb-4 flex justify-center items-center gap-3">
            <div className="relative">
              {(heartbeat && heartbeat.medal !== "") && (
                <div className="absolute -left-8 h-full">
                  <Medal type={heartbeat.medal} />
                </div>
              )}
              <Button type="primary" onClick={handleOk} className="w-full max-w-[14ch]">Новая игра</Button>
            </div>
            <Hint onGetHint={handleGetHint} />
          </div>
          <MainInput onEnter={onEnterWord} isLoading={isLoadingGuess} />
          {currentWord && (
            <div className="mt-2">
              <CardWord
                data={currentWord}
                countGamers={heartbeat?.gamers.length || 0}
                multi={(heartbeat?.players_num! > 1)}
              />
            </div>
          )}
          <div
            className="flex flex-col mt-5 w-full h-full gap-2 overflow-auto border-t-[1px] border-[var(--first-gray)] dark:border-[var(--second-gray)] pt-2">
            {
              words.map(word => (
                <CardWord
                  key={word.guess}
                  data={word}
                  countGamers={heartbeat?.gamers.length || 0}
                  multi={(heartbeat?.players_num! > 1)}
                />
              ))
            }
          </div>
        </div>
      </div>
      {
        !!isWin && (
          <WinModal data={isWin} onOk={handleOk} medal={medal} />
        )
      }
      {
        !!hint && <HintModal hint={hint} onClose={clearHint} />
      }
    </>
  );
};