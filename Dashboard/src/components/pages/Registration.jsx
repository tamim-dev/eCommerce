import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";

const Registration = () => {
    let navigate = useNavigate();
    const [loadings, setLoadings] = useState(false);
    const [form] = Form.useForm();

    const notifysuccess = (mas) => toast.success(mas);
    const notifyerror = (mas) => toast.error(mas);

    const onFinish = async (values) => {
        setLoadings(true);
        let data = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        let user_data = await axios.post(
            "http://localhost:8000/api/v1/auth/registration",
            data
        );

        if (user_data.data.success) {
            form.resetFields();
            setLoadings(false);
            notifysuccess(user_data.data.success);
            navigate(`/otp/${user_data.data.email}`);
        } else {
            setLoadings(false);
            notifyerror(user_data.data.error);
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
                    <Input placeholder="email" type="email"/>
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
