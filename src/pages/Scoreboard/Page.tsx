import { useGetScoreboard } from "../../api/api.ts";
import { Card } from "antd";
import { PageLoader } from "../../components/PageLoader.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.ts";

export const Scoreboard = () => {
  const { data: scoreboard, isLoading } = useGetScoreboard();
  usePageTitle("Топ игроков");

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-full">
      <h2 className="font-medium text-2xl dark:text-white">Топ игроков</h2>
      <div className="flex flex-col gap-4 w-full h-full max-h-[74dvh] mt-5 overflow-auto pr-2">
        {
          scoreboard?.map((user, index) => (
            <Card key={user.email} className="p-4 w-full">
              <div className="flex justify-between items-center gap-5">
                <div className="flex gap-2 items-center">
                  <b>{index + 1}.</b>
                  <span>{user.email}</span>
                </div>
                <span>{user.pp}</span>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  );
};