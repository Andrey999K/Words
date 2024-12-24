import { useGetUser } from "../../api/api.ts";

export const Home = () => {
  const { data: userAuth } = useGetUser();

  console.log(userAuth);

  return <div>Home</div>;
};
