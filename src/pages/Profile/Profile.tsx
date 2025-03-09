import { usePageTitle } from "../../hooks/usePageTitle.ts";
import { useGetUser } from "../../api/api.ts";
import { PageLoader } from "../../components/PageLoader.tsx";
import { Avatar, Typography } from "antd";
import { MedalTypes } from "../../types";
import { Medal } from "../../components/Medal.tsx";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const Profile = () => {
  const { data: userData, isLoading: isLoadingUser } = useGetUser();
  usePageTitle("Профиль");

  const renderRowMedals = (type: MedalTypes, number: number) => {
    if (number < 1) return false;

    const medals = [];

    for (let i = 0; i < number; i++) {
      medals.push(
        <div className="w-full max-w-8">
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

  if (isLoadingUser) return <PageLoader />;

  return (
    <div className="h-full flex flex-col items-center gap-10">
      <div className="flex h-auto w-full gap-10">
        <Avatar size={150} icon={<UserOutlined />} />
        <div className="flex flex-col gap-2 text-white">
          <p>Почта: {userData?.email}</p>
          <p>Pp: {userData?.pp}</p>
        </div>
      </div>
      <div className="w-full h-full">
        <Title className="!text-2xl w-full">Достижения</Title>
        {userData && (
          <div className="flex flex-wrap gap-3 w-full max-h-[30dvh] overflow-auto">
            {renderAllMedals()}
          </div>
        )}
      </div>
    </div>
  );
};