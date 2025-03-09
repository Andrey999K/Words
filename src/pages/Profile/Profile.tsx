import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { useGetScores, useGetUser } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { Avatar, Typography } from "antd";
import { MedalTypes } from "../../types";
import { Medal } from "../../components/Medal.tsx";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const Profile = () => {
  const { data: userData, isLoading: isLoadingUser } = useGetUser();
  const { data: scores, isLoading: isLoadingScores } = useGetScores();
  usePageTitle("Профиль");

  const renderRowMedals = (type: MedalTypes, number: number) => {
    if (number < 1) return false;

    const medals = [];

    for (let i = 0; i < number; i++) {
      medals.push(
        <div key={`component-${i}`} className="w-full max-w-8">
          <Medal key={`medal-${i}`} type={type} />
        </div>,
      );
    }

    return medals;
  };

  const renderAllMedals = () => {
    if (userData) {
      return (
        <>
          {renderRowMedals("chromatic", userData?.medals.chromatic)}
          {renderRowMedals("diamond", userData?.medals.diamond)}
          {renderRowMedals("gold", userData?.medals.gold)}
          {renderRowMedals("silver", userData?.medals.silver)}
          {renderRowMedals("bronze", userData?.medals.bronze)}
          {renderRowMedals("chocolate", userData?.medals.chocolate)}
        </>
      );
    }
  };

  const medalsCount = userData ? (userData?.medals.chromatic +
    userData?.medals.diamond +
    userData?.medals.gold +
    userData?.medals.chocolate +
    userData?.medals.silver +
    userData?.medals.bronze +
    userData?.medals.chocolate) : 0;


  if (isLoadingUser || isLoadingScores) return <PageLoader />;

  return (
    <div className="h-full flex flex-col items-center gap-10">
      <div className="flex h-auto w-full gap-10">
        <Avatar size={150} icon={<UserOutlined />} />
        <div className="flex flex-col gap-2 text-white">
          <p>Почта: {userData?.email}</p>
          <p>Pp: {userData?.pp}</p>
          {!!scores && <p>Количество игр: {scores?.length}</p>}
        </div>
      </div>
      {!!medalsCount && (
        <div className="w-full h-full">
          <Title className="!text-2xl w-full">Достижения</Title>
          {userData && (
            <div className="flex flex-col gap-8">
              {!!scores?.length && (
                <div className="flex flex-col gap-2 w-full max-h-[30dvh] overflow-auto dark:text-white pr-2">
                  <div className="flex px-3">
                    <span className="w-full max-w-[7%]"></span>
                    <span className="w-full max-w-[15%]">Слово</span>
                    <span className="w-full max-w-[10%]">Попытки</span>
                    <span className="w-full max-w-[15%]">Частота</span>
                    <span className="w-full max-w-[15%]">Подсказки</span>
                    <span className="block ml-auto">Pp</span>
                  </div>
                  {
                    scores?.map((score, index) => (
                      <div className="flex p-3 rounded-xl bg-first-gray" key={score.id}>
                        <span className="w-full max-w-[7%]">{index + 1}</span>
                        <span className="w-full max-w-[15%]">{score.word}</span>
                        <span className="w-full max-w-[10%]">{score.attempts}</span>
                        <span className="w-full max-w-[15%]">{score.ipm}</span>
                        <span className="w-full max-w-[15%]">{score.hints}</span>
                        <span className="block ml-auto">
                      {score.pp}
                    </span>
                      </div>
                    ))
                  }
                </div>
              )}
              <div className="flex flex-wrap gap-3 w-full max-h-[30dvh] overflow-auto">
                {renderAllMedals()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};