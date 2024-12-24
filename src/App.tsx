import { useGetUser } from "./api/api.ts";

export const App = () => {
  const { data: userAuth } = useGetUser();

  console.log(userAuth);

  return <div className="font-bold text-red-600">12312</div>;
};
