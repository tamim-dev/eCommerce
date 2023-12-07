import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import axiox from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const onFinish = async (values) => {
        let data = {
            email: values.email,
            password: values.password,
        };
        let user_data = await axiox.post(
            "http://localhost:8000/api/v1/auth/login",
            data
        );
        if(user_data.data[0].role == "User"){
            console.log("you do not have premission for login");
        }else{
            console.log("login successful");
        }
        // navigate();
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo.values);
    };
  return (
    <Card
            title="Login"
            bordered={false}
            style={{
                width: 400,
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 100,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 100,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
  );
};

export default Login;
