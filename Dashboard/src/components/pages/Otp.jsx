import React, { useState } from "react";
import { Button, message, Form, Input, Card } from "antd";
import axiox from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Otp = () => {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    let { email } = useParams();

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
        let data = {
            otp: values.otp,
            email: email,
        };
        
        let user_data = await axiox.post(
            "http://localhost:8000/api/v1/auth/otpverify",
            data
        );

        if (user_data.data.success) {
            success(user_data.data.success);
            navigate("/login")
        } else {
            errors(user_data.data.error);
        }
    };

    return (
        <Card
            title="OTP"
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
            >
                <Form.Item
                    label="Check email for OTP"
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: "Please input your OTP",
                        },
                    ]}
                >
                    <Input />
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

export default Otp;
