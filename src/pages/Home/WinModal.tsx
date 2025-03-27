import { Modal } from "antd";
import { FC, useContext, useEffect } from "react";
import { Guess, MedalTypes } from "../../types";
import { ThemeContext } from "../../App.tsx";
import { Medal } from "../../components/Medal.tsx";
import { useGetFinalMessage } from "../../api/api.ts";

type WinModalProps = {
  data: Guess,
  medal: MedalTypes | "",
  onOk: () => void
}

export const WinModal: FC<WinModalProps> = ({ data, medal, onOk }) => {
  const theme = useContext(ThemeContext);
  const { data: finalMessageData } = useGetFinalMessage();

  useEffect(() => {
    const modalWrapper = document.querySelector(".ant-modal-content");
    const modalHeader = document.querySelector(".ant-modal-header");
    if (modalWrapper) {
      (modalWrapper as HTMLElement).style.background = `url(${finalMessageData?.image}) center/cover`;
      (modalHeader as HTMLElement).style.backgroundColor = `transparent !important`;
    }
  }, [finalMessageData]);

  return (
    <Modal
      title="Победа!"
      open={!!data}
      onOk={onOk}
      onCancel={onOk}
      okText="Новая игра"
      cancelButtonProps={{ hidden: true }}
      className={`win-modal ${theme?.darkTheme ? "dark-theme !shadow-none" : ""}`}
    >
      <div
        className="flex justify-center gap-4 mt-4"
      >
        {medal && (
          <div className="w-full max-w-[25%]">
            <Medal type={medal} />
          </div>
        )}
        <div>
          <p>{finalMessageData?.message || "Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪"}</p>
          <p>Загаданное слово <b>{data.guess}</b>.</p>
          <p>Ты получил <b>{data.pp}</b> pp.</p>
        </div>
      </div>
    </Modal>
  );
};