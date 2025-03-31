import { FormLogin } from "../../components/FormLogin.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.ts";

export const Login = () => {
  usePageTitle("Вход");

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <FormLogin />
    </div>
  );
};
