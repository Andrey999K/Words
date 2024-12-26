import { QueryClient, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { isDev } from "../utils/isDev.ts";
import { LoginFields, ResponseData, ResponseType } from "../types";

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

const keys = {
  checkAuthUser: "checkAuthUser",
  registerUser: "registerUser",
  loginUser: "loginUser",
  newGame: "newGame",
};

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: isDev() ? import.meta.env.VITE_API_URL_LOCAL : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const customFetch = async (url: string, method?: "GET" | "POST", body?: object) => {
  try {
    let response;
    if (method === "POST") {
      response = await axiosInstance.post(url, body);

    } else {
      response = await axiosInstance.get(url);
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

// проверка юзера, что он залогинен
export const checkAuthUser = async (): Promise<unknown> => {
  const response = await customFetch("/user");
  return response.data;
};

export const useGetUser = (): UseQueryResult<ResponseData, Error> => {
  return useQuery({
    queryKey: [keys.checkAuthUser],
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
  });
};

// новая игра
const newGame = async (body: {
  difficulty: string,
}): Promise<ResponseType> => {
  return customFetch("/game/new", "POST", body);
};

export const useNewGame = () => {
  return useMutation({
    mutationKey: [keys.newGame],
    mutationFn: newGame,
  });
};