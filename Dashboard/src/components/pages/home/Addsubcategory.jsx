import React, { useEffect, useState } from "react";
import { Button, Card, Flex, Form, Input, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const Addsubcategory = () => {
    let ownerId = useSelector((state) => state.users.value);
    let [mess, setMess] = useState("");
    const [form] = Form.useForm();
    let [subcategory, setSubCategory] = useState([]);
    let [categoryId, setCategoryId] = useState("")

    let handleChange =(value)=>{
        setCategoryId(value);
    }

    useEffect(() => {
        let arr = [];
        async function category() {
            let categoryData = await axios.get(
                "http://localhost:8000/api/v1/product/allcategory"
            );

            categoryData.data.map((item) => {
                if (item.isActive) {
                    arr.push({
                        value: item._id,
                        label: item.name,
                    });
                }
            });
            setSubCategory(arr);
        }
        category();
    }, []);

    const onFinish = async (values) => {
        let name =
            values.subcategory.charAt(0).toUpperCase() +
            values.subcategory.slice(1);
        let data = {
            name: name,
            categoryId: categoryId,
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
                    label="Sub Category"
                    name="subcategory"
                    rules={[
                        {
                            required: true,
                            message: "Please input your sub Category Name!",
                        },
                    ]}
                >
                    <div style={{ display: "flex", columnGap: "10px" }}>
                        <Input />
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            onChange={handleChange}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={subcategory}
                        />
                    </div>
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
