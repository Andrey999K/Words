import { Button, Card, Form, FormProps, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { useLoginUser } from "../api/api.ts";
import { LoginFields } from "../types";
import { PageLoader } from "./PageLoader.tsx";

const onFinishFailed: FormProps<LoginFields>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const FormLogin = () => {
  const { mutateAsync: loginUser, isPending } = useLoginUser();
  const navigate = useNavigate();

  const onFinish: FormProps<LoginFields>["onFinish"] = (values) => {
    loginUser(values).then(response => {
      if (response.status === "200") {
        navigate(Routes.HOME);
      } else {
        message.error("Неправильный логин или пароль");
      }
    });
  };

  return (
    <>
      {isPending && <PageLoader />}
      <Card className="p-4 dark:bg-black">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <Form.Item<LoginFields>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginFields>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex items-center w-full gap-4">
            <Link to={Routes.REGISTRATION} className="w-full">
              <Button className="w-full">
                Registration
              </Button>
            </Link>
            <Form.Item label={null} className="w-full mb-0">
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};
