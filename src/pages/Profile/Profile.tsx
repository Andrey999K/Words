import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { useGetProfile, useGetScores } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { Avatar, Typography } from "antd";
import { MedalTypes } from "../../types";
import { Medal } from "../../components/Medal.tsx";
import { UserOutlined } from "@ant-design/icons";
import { roundNumber } from "../../utils/roundNumber.ts";
import { useEffect } from "react";

const { Title } = Typography;

const getUrlParam = (userId: string) => {
  const searchParams = new URLSearchParams(userId);
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};

export const Profile = () => {
  const userId = getUrlParam(window.location.search)["userId"] || "";
  const {
    data: userData,
    isFetching: isLoadingUser,
  } = useGetProfile(userId);
  const { data: scores, isFetching: isLoadingScores } = useGetScores(
    userId,
  );
  usePageTitle("Профиль");

  const renderRowMedals = (type: MedalTypes, number: number): any[] => {
    if (number < 1) return [];

    const medals = [];

    for (let i = 0; i < number; i++) {
      medals.push(
        <div
          key={`type-${i}`}
          className="w-full max-w-8 -ml-[28px]"
        >
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
          {renderRowMedals("unobtanium", userData?.medals.unobtanium)}
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

  const renderMedalWord = (type: MedalTypes | "") => {
    if (type === "") return false;
    return (
      <div className="max-w-4 flex items-center pt-[2px]">
        <Medal type={type} />
      </div>
    );
  };

  const medalsCount = userData ? (userData?.medals.chromatic +
    userData?.medals.diamond +
    userData?.medals.gold +
    userData?.medals.chocolate +
    userData?.medals.silver +
    userData?.medals.bronze +
    userData?.medals.chocolate) : 0;

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        const medalsContainer = document.querySelector(".medals-container")!;
        if (medalsContainer) {
          const medalsElems = Array.from(medalsContainer.children);
          medalsElems.forEach(
            (child, index) => {
              (child as HTMLElement).style.zIndex = `${medalsElems.length - index}`;
            },
          );
        }
      }, 200);
    }
  }, [userData]);

  if (
    isLoadingUser ||
    isLoadingScores ||
    (
      userId === null && window.location.search.includes("userid")
    )
  ) return <PageLoader />;

  return (
    <div className="h-full flex flex-col items-center gap-10">
      <div className="flex h-auto w-full gap-3 md:gap-10">
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
                <div className="flex flex-col gap-2 w-full dark:text-white text-[11px] leading-none md:text-base">
                  <div className="flex pl-3 pr-6">
                    <span className="w-full max-w-[7%]"></span>
                    <span className="w-full max-w-[2.5%]"></span>
                    <span className="w-full max-w-[15%]">Слово</span>
                    <span className="w-full max-w-[10%] text-center">Попытки</span>
                    <span className="w-full max-w-[25%] text-center">IPM</span>
                    <span className="w-full max-w-[17%] text-center">Подсказки</span>
                    <span className="block w-full text-center">PP</span>
                  </div>
                  <div className="flex flex-col gap-2 max-h-[31dvh] overflow-auto pr-2">
                    {
                      scores?.map((score, index) => (
                        <div className="flex p-3 rounded-xl bg-first-gray items-center" key={score.id}>
                          <span className="w-full max-w-[7%]">{index + 1}</span>
                          <span className="w-full max-w-[2.5%]">{renderMedalWord(score.medal)}</span>
                          <span className="w-full max-w-[15%]">{score.word}</span>
                          <span className="w-full max-w-[10%] text-center">{score.attempts}</span>
                          <span className="w-full max-w-[25%] text-center">{score.ipm}</span>
                          <span className="w-full max-w-[17%] text-center">{score.hints}</span>
                          <span className="block w-full text-center">
                            {roundNumber(score.pp)}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3 w-full max-h-[30dvh] overflow-auto medals-container pl-8">
                {renderAllMedals()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};