import { Modal } from "antd";
import { FC, useContext } from "react";
import { Guess } from "../../types";
import { ThemeContext } from "../../App.tsx";

type WinModalProps = {
  data: Guess,
  onOk: () => void
}

export const WinModal: FC<WinModalProps> = ({ data, onOk }) => {
  const theme = useContext(ThemeContext);

  return (
    <Modal
      title="Победа!"
      open={!!data}
      onOk={onOk}
      onCancel={onOk}
      okText="Новая игра"
      cancelButtonProps={{ hidden: true }}
      className={theme?.darkTheme ? "dark-theme !shadow-none" : ""}
    >
      <p>Ты угадал, йоу, красава, мээээээээээээээээээээээээээээээн!!!!!!!🤪🤪🤪</p>
      <p>Загаданное слово <b>{data.guess}</b>.</p>
      <p>Ты получил <b>{data.pp}</b> pp.</p>
    </Modal>
  );
};