import { QueryClient, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { isDev } from "../utils/isDev.ts";
import { FinalMessageResponse, Hint, LoginFields, ResponseType, ScoreboardType, UserData } from "../types";
import { HeartbeatResponse, JoinGameResponse, NewWordResponse, Score } from "./types.ts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const keys = {
  user: "user",
  registerUser: "registerUser",
  loginUser: "loginUser",
  newGame: "newGame",
  sendGuess: "sendGuess",
  logoutUser: "logoutUser",
  hint: "hint",
  scoreboard: "scoreboard",
  join: "join",
  heartbeat: "getHeartbeat",
  newWord: "newWord",
  gameStop: "gameStop",
  scores: "scores",
  profile: "profile",
  finalMessage: "finalMessage",
};

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: window.location.href.startsWith("http://front.dev.local") ? import.meta.env.VITE_API_URL_LOCAL : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const customFetch = async (url: string, method?: "GET" | "POST", body?: object, auth?: boolean) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = auth ? {Authorization: token} : null;
    const config = headers ? {headers} : {};
    let response;
    if (method === "POST") {
      response = await axiosInstance.post(url, body, config);
    } else {
      response = await axiosInstance.get(url, config);
    }
    if (response.status === 200) {
      return response.data.result;
    }
    if (isDev()) {
      console.log("response", response);
    }
    return "Error";
  } catch (error) {
    if (isDev()) {
      console.log(error);
    }
  }
};

// получение данных текущего пользователя
export const checkAuthUser = async (): Promise<unknown> => {
  const response = await customFetch("/user", "GET", {}, true);
  return response.data;
};

export const useGetUser = (): UseQueryResult<UserData, Error> => {
  return useQuery({
    queryKey: [keys.user],
    queryFn: checkAuthUser,
  });
};

// регистрация пользователя
const registerUser = async (body: object): Promise<ResponseType> => {
  return customFetch("/user/register", "POST", body);
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: [keys.registerUser],
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [keys.user]});
      queryClient.invalidateQueries({queryKey: [keys.heartbeat]});
    },
  });
};

// вход
const loginUser = async (body: LoginFields): Promise<ResponseType> => {
  return customFetch("/user/login", "POST", body);
};

export const useLoginUser = () => {
  return useMutation({
    mutationKey: [keys.loginUser],
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [keys.user]});
      queryClient.invalidateQueries({queryKey: [keys.heartbeat]});
    },
  });
};

// выход
const logoutUser = async (): Promise<ResponseType> => {
  return customFetch("/user/logout", "POST", {}, true);
};

export const useLogoutUser = () => {
  return useMutation({
    mutationKey: [keys.logoutUser],
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [keys.heartbeat]});
      queryClient.invalidateQueries({queryKey: [keys.user]});
    },
  });
};

// новая игра
const newGame = async (body: {
  difficulty: string,
}): Promise<ResponseType> => {
  return customFetch("/game/new", "POST", body, true);
};

export const useNewGame = () => {
  return useMutation({
    mutationKey: [keys.newGame],
    mutationFn: newGame,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [keys.user]});
      queryClient.invalidateQueries({queryKey: [keys.heartbeat]});
    },
  });
};

// проверить слово
const sendGuess = async (word: string): Promise<ResponseType<{
  comment: string | null,
  guess: string,
  pp: number
  result: string
}>> => {
  return customFetch(
    "/game/guess",
    "POST",
    {
      guess: word,
    },
    true);
};

export const useSendGuess = () => {
  return useMutation({
    mutationKey: [keys.sendGuess],
    mutationFn: sendGuess,
  });
};

// получение подсказки
const getHint = async (): Promise<ResponseType<Hint>> => {
  return customFetch("/game/hint", "GET", {}, true);
};

export const useGetHint = () => {
  return useMutation({
    mutationKey: [keys.hint],
    mutationFn: getHint,
  });
};

// получение таблицы очков пользователей
export const getScoreboard = async (): Promise<unknown> => {
  const response = await customFetch("/game/scoreboard", "GET", {}, true);
  return response.data.scoreboard;
};

export const useGetScoreboard = (): UseQueryResult<ScoreboardType[], Error> => {
  return useQuery({
    queryKey: [keys.scoreboard],
    queryFn: getScoreboard,
    refetchOnMount: "always",
  });
};

// присоединение к игре
const joinGame = async (joinCode: string): Promise<ResponseType<JoinGameResponse>> => {
  return customFetch(
    "/game/join",
    "POST",
    {
      joinCode,
    },
    true
  );
};

export const useJoinGame = () => {
  return useMutation({
    mutationKey: [keys.join],
    mutationFn: joinGame,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [keys.user]});
      queryClient.invalidateQueries({queryKey: [keys.heartbeat]});
    },
  });
};

// получение состояния игры
export const getHeartbeat = async (): Promise<ResponseType<HeartbeatResponse>> => {
  const response = await customFetch("/game/heartbeat", "GET", {}, true);
  return response.data;
};

export const useHeartbeat = (): UseQueryResult<HeartbeatResponse, Error> => {
  return useQuery({
    queryKey: [keys.heartbeat],
    queryFn: getHeartbeat,
    refetchInterval: 1000,
  });
};

// добавление нового слова
const addNewWord = async (newWord: string): Promise<ResponseType<NewWordResponse>> => {
  return customFetch(
    "/game/missing",
    "POST",
    {
      newWord,
    },
    true
  );
};

export const useNewWord = () => {
  return useMutation({
    mutationKey: [keys.newWord],
    mutationFn: addNewWord,
  });
};

// остановка игры
const gameStop = async (): Promise<ResponseType<any>> => {
  return customFetch("/game/stop", "POST", {}, true);
};

export const useGameStop = () => {
  return useMutation({
    mutationKey: [keys.gameStop],
    mutationFn: gameStop,
  });
};

// получение таблицы очков пользователей
export const getScores = async (id: string): Promise<unknown> => {
  const response = await customFetch(id ? `/game/scores?userId=${id}` : "/game/scores", "GET", {}, true);
  return response.data.scores;
};

export const useGetScores = (id: string): UseQueryResult<Score[], Error> => {
  return useQuery({
    queryKey: [keys.scores],
    queryFn: () => getScores(id),
    refetchOnMount: "always",
  });
};

// получение данных профиля пользователя
export const getProfile = async (id: string): Promise<unknown> => {
  const response = await customFetch(!!id ? `/profile?userId=${id}` : "/profile", "GET", {}, true);
  return response.data;
};

export const useGetProfile = (id: string): UseQueryResult<UserData, Error> => {
  return useQuery({
    queryKey: [keys.profile],
    queryFn: () => getProfile(id),
    refetchOnMount: "always",
  });
};

// получение данных финального сообщения
export const getFinalMessage = async (): Promise<unknown> => {
  const response = await customFetch("/game/final_message", "GET", {}, true);
  return response.data;
};

export const useGetFinalMessage = (): UseQueryResult<FinalMessageResponse, Error> => {
  return useQuery({
    queryKey: [keys.finalMessage],
    queryFn: getFinalMessage,
    refetchOnMount: "always",
  });
};