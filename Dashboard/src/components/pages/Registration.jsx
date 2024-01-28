import React, { useState } from "react";
import { Button, message, Form, Input, Card } from "antd";
import axiox from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loadings, setLoadings] = useState(false);
    const [form] = Form.useForm();

    const success = (e) => {
        messageApi.open({
            type: "success",
            content: e,
        });
    };
    const errors = (e) => {
        messageApi.open({
            type: "error",
            content: e,
        });
    };

    const onFinish = async (values) => {
        setLoadings(true);
        let data = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        let user_data = await axiox.post(
            "http://localhost:8000/api/v1/auth/registration",
            data
        );

        if (user_data.data.success) {
            form.resetFields();
            setLoadings(false);
            success(user_data.data.success);
            navigate(`/otp/${user_data.data.email}`);
        } else {
            setLoadings(false);
            errors(user_data.data.error);
        }
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
            {contextHolder}
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
                autoComplete="off"
                form={form}
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
                    <Input placeholder="full name" />
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
                    <Input placeholder="email" />
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
                    <Input.Password placeholder="password" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 100,
                    }}
                >
                    {loadings ? (
                        <Button type="primary" loading>
                            Submit
                        </Button>
                    ) : (
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    )}
                    <p className="alert_registra">
                        Allready have an account
                        <Link to="/login" className="alert_a_tag">
                            Sign In
                        </Link>
                    </p>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Registration;
