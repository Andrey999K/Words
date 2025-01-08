import { Modal } from "antd";
import { FC, useContext } from "react";
import { ThemeContext } from "../App.tsx";

type HintModalProps = {
  hint: null | string,
  onClose: () => void,
}

export const HintModal: FC<HintModalProps> = ({ hint, onClose }) => {
  const theme = useContext(ThemeContext);

  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };


  return (
    <Modal title="Подсказка!" open={!!hint} onOk={handleOk} onCancel={handleCancel}
           cancelButtonProps={{ hidden: true }}
           className={theme?.darkTheme ? "dark-theme !shadow-none" : ""}
    >
      <p>Попробуй ввести <b>{hint}</b>.</p>
    </Modal>
  );
};