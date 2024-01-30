import React from "react";
import axiox from "axios";
import { toast } from "react-toastify";
import { userData } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Card} from "antd";

const Login = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const notifysuccess = (mas) => toast.success(mas);
    const notifyerror = (mas) => toast.error(mas);

    const onFinish = async (values) => {
        let data = {
            email: values.email,
            password: values.password,
        };

        let user_data = await axiox.post(
            "http://localhost:8000/api/v1/auth/login",
            data
        );

        if (user_data.data.success) {
            if (user_data.data.role == "User") {
                notifyerror("you do not have premission for login");
            } else {
                notifysuccess(user_data.data.success);
                navigate("/home");
                dispatch(userData(user_data.data));
                localStorage.setItem("user", JSON.stringify(user_data.data));
            }
        } else {
            notifyerror(user_data.data.error);
        }
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
                <div style={{ textAlign: "end" }}>
                    <Link to="/forgotpassword">Forgot Password</Link>
                </div>
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 100,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <p className="alert_registra">
                        Don't have an account
                        <Link to="/" className="alert_a_tag">
                            Sign Up
                        </Link>
                    </p>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
