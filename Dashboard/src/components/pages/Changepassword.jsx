import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Changepassword = () => {
    let navigate = useNavigate();
    let { token } = useParams();
    const notifysuccess = (mas) => toast.success(mas);
    const notifyerror = (mas) => toast.error(mas);

    const onFinish = async (values) => {
        let data = {
            token: token,
            password: values.password,
        };
        let user_data = await axios.post(
            "http://localhost:8000/api/v1/auth/changepassword",
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
            title="Change Password"
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
                    label="New Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password",
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

export default Changepassword;
