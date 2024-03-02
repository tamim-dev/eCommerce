import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const Addcategory = () => {
    let ownerId = useSelector((state) => state.users.value);
    let [mess, setMess] = useState("");
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let name =
            values.category.charAt(0).toUpperCase() + values.category.slice(1);
        let data = {
            name: name,
            ownerId: ownerId.id,
        };

        let categoryData = await axios.post(
            "http://localhost:8000/api/v1/product/createcategory",
            data
        );
        if (categoryData.data.success) {
            form.resetFields();
            setMess(categoryData.data.success);
        } else {
            form.resetFields();
            setMess(categoryData.data.error);
        }
    };

    if (mess) {
        setTimeout(() => {
            setMess("");
        }, 4000);
    }

    return (
        <Card
            title="Add Category"
            bordered={false}
            style={{
                width: "100%",
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 100,
                }}
                style={{
                    maxWidth: 750,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <p>{mess}</p>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Category Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 12,
                        span: 10,
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

export default Addcategory;
