import { Modal } from "antd";
import { FC, useContext, useState } from "react";
import { ThemeContext } from "../../App.tsx";

type HintModalProps = {
  hint: null | string
}

export const HintModal: FC<HintModalProps> = ({ hint }) => {
  const [currentHint, setCurrentHint] = useState<null | string>(hint);
  const theme = useContext(ThemeContext);

  const handleOk = () => {
    setCurrentHint(null);
  };

  const handleCancel = () => {
    setCurrentHint(null);
  };


  return (
    <Modal title="Подсказка!" open={!!currentHint} onOk={handleOk} onCancel={handleCancel}
           cancelButtonProps={{ hidden: true }}
           className={theme?.darkTheme ? "dark-theme !shadow-none" : ""}
    >
      <p>Попробуй ввести <b>{hint}</b>.</p>
    </Modal>
  );
};