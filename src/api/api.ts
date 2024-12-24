import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";

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

export const checkAuthUser = async (): Promise<unknown> => {
  const response = await customFetch("/users/me");
  return await response.json();
};

export const useGetUser = (): UseQueryResult<{ result: string }, Error> => {
  return useQuery({
    queryKey: [keys.checkAuthUser],
    queryFn: checkAuthUser,
  });
};
