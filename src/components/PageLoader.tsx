import { Spin } from "antd";

export const PageLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
};
