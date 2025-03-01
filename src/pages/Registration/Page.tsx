import { FormRegistration } from "../../components/FormRegistration.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.ts";

export const Registration = () => {
  usePageTitle("Регистрация");

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <FormRegistration />
    </div>
  );
};
