import { Button, Form, Input, Modal } from "antd";
import { useRegisterUser } from "../api/api.ts";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const FormRegistration = () => {
  const [form] = Form.useForm();
  const { mutateAsync: userRegister } = useRegisterUser();
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
      }
    });
  };

  return (
    <>
      <Modal title={status?.title} open={!!status} onOk={handleOk} cancelButtonProps={{ hidden: true }}></Modal>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="w-full max-w-[60ch]"
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
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
