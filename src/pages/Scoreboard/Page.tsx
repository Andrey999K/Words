import { useGetScoreboard } from "../../api/api.ts";
import { Card } from "antd";
import { PageLoader } from "../../components/PageLoader.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { Link } from "react-router-dom";
import bronzeCup from "../../assets/cup/bronze.png";
import silverCup from "../../assets/cup/silver.png";
import goldCup from "../../assets/cup/gold.png";

export const Scoreboard = () => {
  const { data: scoreboard, isLoading } = useGetScoreboard();
  usePageTitle("Топ игроков");

  const renderCup = (cupType: "gold" | "silver" | "bronze" | "") => {
    let cup = "";
    switch (cupType) {
      case "bronze":
        cup = bronzeCup;
        break;
      case "silver":
        cup = silverCup;
        break;
      case "gold":
        cup = goldCup;
        break;
      default:
        return;
    }
    return <img src={cup} alt="" />;
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-full">
      <h2 className="font-medium text-2xl dark:text-white">Топ игроков</h2>
      <div className="flex flex-col gap-4 w-full h-full max-h-[74dvh] mt-5 overflow-auto pr-2">
        {
          scoreboard?.map((user, index) => (
            <Link to={`/profile?userId=${user.id}`} key={user.email}>
              <Card className="p-4 w-full">
                <div className="flex justify-between items-center gap-5">
                  <div className="flex gap-2 items-center">
                    <div className="w-8">
                      {index === 0 && renderCup("gold")}
                      {index === 1 && renderCup("silver")}
                      {index === 2 && renderCup("bronze")}
                    </div>
                    <b>{index + 1}.</b>
                    <span>{user.email}</span>
                  </div>
                  <span>{user.pp}</span>
                </div>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  );
};