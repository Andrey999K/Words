import { Button, Popconfirm, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FC } from "react";

type HintProps = {
  onGetHint: () => void;
}

export const Hint: FC<HintProps> = ({ onGetHint }) => {
  return (
    <div className="flex gap-2 items-center relative w-full max-w-[13ch]">
      <Popconfirm
        title="Использовать подсказку?"
        onConfirm={onGetHint}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="primary" className="block w-full max-w-[14ch]">Подсказка</Button>
      </Popconfirm>
      <Tooltip title="Каждое использование подсказки уменьшает количество очков в 2 раза!">
        <QuestionCircleOutlined className="dark:text-white cursor-pointer absolute -right-5" />
      </Tooltip>
    </div>
  );
};