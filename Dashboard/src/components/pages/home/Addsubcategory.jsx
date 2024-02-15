import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const Addsubcategory = () => {
    let ownerId = useSelector((state) => state.users.value);
    let [mess, setMess] = useState("");
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let name =
            values.subcaregory.charAt(0).toUpperCase() + values.subcaregory.slice(1);
        let data = {
            name: name,
            ownerId: ownerId.id,
        };

        let subcategoryData = await axios.post(
            "http://localhost:8000/api/v1/product/createsubcategory",
            data
        );
        if (subcategoryData.data.success) {
            form.resetFields();
            setMess(subcategoryData.data.success);
        } else {
            form.resetFields();
            setMess(subcategoryData.data.error);
        }
    };

    if (mess) {
        setTimeout(() => {
            setMess("");
        }, 4000);
    }

    return (
        <Card
            title="Add sub Category"
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
                    label="Sub Caregory"
                    name="subcaregory"
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

export default Addsubcategory;
