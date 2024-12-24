import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { isDev } from "../utils/isDev.ts";

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
};

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const checkAuthUser = async (): Promise<unknown> => {
  try {
    const response = await axiosInstance.get("/user");
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

export const useGetUser = (): UseQueryResult<{ result: string }, Error> => {
  return useQuery({
    queryKey: [keys.checkAuthUser],
    queryFn: checkAuthUser,
  });
};
