import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";

const Addstore = () => {
    let ownerId = useSelector((state) => state.users.value);
    
    const onFinish = async (values) => {
        let data = await axios.post(
            "http://localhost:8000/api/v1/product/createstore",
            {
                storename: values.storename,
                nidnumber: values.nidnumber,
                tradenumber: values.tradenumber,
                ownerId: ownerId.id,
            }
        );
        console.log(data);
    };
    return (
        <Card
            title="Add Store"
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
                    label="Store Name"
                    name="storename"
                    rules={[
                        {
                            required: true,
                            message: "Please input your store Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Trade Number"
                    name="tradenumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Trade number!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="NID"
                    name="nidnumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Nid Number!",
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

export default Addstore;
