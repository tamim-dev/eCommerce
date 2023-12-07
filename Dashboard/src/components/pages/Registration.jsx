import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import axiox from "axios";

const Registration = () => {
    const onFinish = async (values) => {
        let data = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        let user_data = await axiox.post("http://localhost:8000/api/v1/auth/registration", data);
        console.log(user_data.data);
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo.values);
    };
    return (
        <Card
            title="Registration"
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
                    label="Username"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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

export default Registration;
