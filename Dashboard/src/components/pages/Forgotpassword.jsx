import React from "react";
import { Button, message, Form, Input, Card } from "antd";
import axiox from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Forgotpassword = () => {
    let navigate = useNavigate();

    const notifysuccess = (mas) => toast.success(mas);
    const notifyerror = (mas) => toast.error(mas);

    const onFinish = async (values) => {
        let data = {
            email: values.email,
        };
        let user_data = await axiox.post(
            "http://localhost:8000/api/v1/auth/forgotpassword",
            data
        );

        if (user_data.data.success) {
            notifysuccess(user_data.data.success);
            navigate("/login");
        } else {
            notifyerror(user_data.data.error);
        }
    };

    return (
        <Card
            title="Forgot Password"
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

export default Forgotpassword;
