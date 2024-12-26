import { Button, Card, Form, Input, Modal } from "antd";
import { useRegisterUser } from "../api/api.ts";
import { useState } from "react";
import { PageLoader } from "./PageLoader.tsx";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

export const FormRegistration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutateAsync: userRegister, isPending } = useRegisterUser();
  const [status, setStatus] = useState<null | {
    title: string,
    description?: string,
  }>(null);

  const handleOk = () => {
    setStatus(null);
  };

  const onFinish = (values: any) => {
    userRegister(values).then(response => {
      console.log(response);
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
      <Card className="p-4 w-full max-w-[70ch]">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          className="w-full max-w-[70ch] flex flex-col gap-4"
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
                message: "Please input your E-mail!",
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
                message: "Please input your password!",
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
                message: "Please confirm your password!",
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
          <div className="flex gap-4 w-full">
            <Link to={Routes.LOGIN} className="w-full">
              <Button className="w-full">
                Login
              </Button>
            </Link>
            <Form.Item className="w-full">
              <Button type="primary" htmlType="submit" className="w-full">
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </>
  );
};
