import { Modal } from "antd";
import { FC, useContext } from "react";
import { Guess, MedalTypes } from "../../types";
import { ThemeContext } from "../../App.tsx";
import { Medal } from "../../components/Medal.tsx";

type WinModalProps = {
  data: Guess,
  medal: MedalTypes | "",
  onOk: () => void
}

export const WinModal: FC<WinModalProps> = ({ data, medal, onOk }) => {
  const theme = useContext(ThemeContext);

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
      <div className="flex justify-center gap-4 mt-4">
        {medal && (
          <div className="w-full max-w-[25%]">
            <Medal type={medal} />
          </div>
        )}
        <div>
          <p>Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
          <p>Загаданное слово <b>{data.guess}</b>.</p>
          <p>Ты получил <b>{data.pp}</b> pp.</p>
        </div>
      </div>
    </Modal>
  );
};