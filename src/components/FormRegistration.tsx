import { Button, Card, Form, FormProps, Input, Modal } from "antd";
import { useRegisterUser } from "../api/api.ts";
import { useState } from "react";
import { PageLoader } from "./PageLoader.tsx";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";
import { LoginFields } from "../types";

export const FormRegistration = () => {
  const navigate = useNavigate();
  const { mutateAsync: userRegister, isPending } = useRegisterUser();
  const [status, setStatus] = useState<null | {
    title: string,
    description?: string,
  }>(null);

  const handleOk = () => {
    setStatus(null);
  };

  const onFinish: FormProps<LoginFields>["onFinish"] = (values) => {
    userRegister(values).then(response => {
      if (response.status === "409") {
        setStatus({
          title: "Пользователь с таким email уже существует",
        });
      } else {
        navigate(Routes.HOME);
      }
    });
  };

  return (
    <>
      {isPending && <PageLoader />}
      <Modal title={status?.title} open={!!status} onOk={handleOk} cancelButtonProps={{ hidden: true }}></Modal>
      <Card className="p-4 dark:bg-second-gray">
        <Form
          name="register"
          onFinish={onFinish}
          className="flex flex-col gap-2"
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Пожалуйста введите ваш E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Пожалуйста введите ваш пароль!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Подтвердите пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex gap-4 w-full mt-2">
            <Link to={Routes.LOGIN} className="w-full">
              <Button className="w-full">
                Login
              </Button>
            </Link>
            <Form.Item className="w-full">
              <Button type="primary" htmlType="submit" className="w-full">
                Registration
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};
