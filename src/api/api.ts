import { QueryClient, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { isDev } from "../utils/isDev.ts";
import { Response } from "../types";

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
};

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const customFetch = async (url: string, method?: "GET" | "POST", body?: object) => {
  try {
    let response;
    if (method === "GET") {
      response = await axiosInstance.get(url);
    } else {
      response = await axiosInstance.post(url, body);
    }
    if (response.status === 200) {
      return response.data.result.data;
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
  return customFetch("/user");
};

export const useGetUser = (): UseQueryResult<{ result: string }, Error> => {
  return useQuery({
    queryKey: [keys.checkAuthUser],
    queryFn: checkAuthUser,
  });
};

// регистрация пользователя
const registerUser = async (body: object): Promise<Response> => {
  return customFetch("/user/register", "POST", body);
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: [keys.registerUser],
    mutationFn: registerUser,
  });
};