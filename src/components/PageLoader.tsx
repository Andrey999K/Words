import { Spin } from "antd";

export const PageLoader = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center absolute inset-0 z-[9999] bg-white/90 dark:bg-first-gray/90">
      <Spin size="large" />
    </div>
  );
};
