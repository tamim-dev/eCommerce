import React from "react";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const Addcategory = () => {
    let ownerId = useSelector((state) => state.users.value);
    const onFinish = async (values) => {
        let data = {
            name: values.caregory,
            ownerId: ownerId.id,
        };

        let categoryData = await axios.post(
            "http://localhost:8000/api/v1/product/createcategory",
            data
        );
        console.log(categoryData);
    };

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
            >
                <Form.Item
                    label="Caregory"
                    name="caregory"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Caregory Name!",
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
