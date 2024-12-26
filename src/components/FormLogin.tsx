import { Button, Card, Form, FormProps, Input } from "antd";
import { Link } from "react-router-dom";
import { Routes } from "../utils/routesConfig.ts";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const FormLogin = () => {
  return (
    <Card className="p-4">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
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
  );
};
