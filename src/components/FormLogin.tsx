import { Button, Card, Form, FormProps, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { keys, queryClient, useLoginUser } from "../api/api.ts";
import { LoginFields } from "../types";
import { useState } from "react";

const onFinishFailed: FormProps<LoginFields>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const FormLogin = () => {
  const {mutateAsync: loginUser, isPending} = useLoginUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<LoginFields>["onFinish"] = (values) => {
    const lowerValues = {
      email: values.email?.toLowerCase(),
      password: values.password,
    };
    setLoading(true);
    loginUser(lowerValues).then(response => {
      setLoading(false);
      if (response.status === "200") {
        const token = response.data.token;
        const typeToken = response.data.type;
        localStorage.setItem("authToken", `${typeToken} ${token}`);
        queryClient.invalidateQueries({queryKey: [keys.user]}).then(() => navigate(Routes.HOME));
      } else {
        message.error("Неправильный логин или пароль");
      }
    }).catch(() => setLoading(false));
  };

  const isLoading = isPending || loading;

  return (
    <Card className="p-4 dark:bg-second-gray">
      <Form
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col gap-3"
      >
        <Form.Item<LoginFields>
          label="Email"
          name="email"
          rules={[{required: true, message: "Пожалуйста введите ваш E-mail!"}]}
        >
          <Input disabled={isLoading}/>
        </Form.Item>

        <Form.Item<LoginFields>
          label="Password"
          name="password"
          rules={[{required: true, message: "Пожалуйста введите ваш пароль!"}]}
        >
          <Input.Password disabled={isLoading}/>
        </Form.Item>

        <div className="flex items-center w-full gap-4">
          <Link to={Routes.REGISTRATION} className="w-full">
            <Button className="w-full">
              Registration
            </Button>
          </Link>
          <Form.Item label={null} className="w-full mb-0">
            <Button type="primary" htmlType="submit" className="w-full" loading={isLoading} disabled={isLoading}>
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};
