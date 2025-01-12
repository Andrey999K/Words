import { Button, Popconfirm, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FC } from "react";

type HintProps = {
  onGetHint: () => void;
}

export const Hint: FC<HintProps> = ({ onGetHint }) => {
  return (
    <div className="flex gap-2 items-center">
      <Popconfirm
        title="Использовать подсказку?"
        onConfirm={onGetHint}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="primary">Подсказка</Button>
      </Popconfirm>
      <Tooltip title="Каждое использование подсказки уменьшает количество очков в 2 раза!">
        <QuestionCircleOutlined className="dark:text-white cursor-pointer" />
      </Tooltip>
    </div>
  );
};