import React, { useState } from "react";
import { Button, Form, Input, Card } from "antd";

const Addproduct = () => {
    let [value, setValue] = useState("");
    let [varinatvalue, setVarinatvalue] = useState([]);
    let [valuestock, setValueStock] = useState("");
    const onFinish = async (values) => {
        let arr = [...varinatvalue];

        arr.push({
            name: values.variantname,
            value: [],
        });
        setVarinatvalue(arr);
    };
    const { TextArea } = Input;

    const handleVariantValue = (index) => {
        varinatvalue[index].value.push({
            name: value,
            stock: valuestock,
        });
        let arr = [...varinatvalue];
        setVarinatvalue(arr);
    };

    return (
        <Card
            title="Login"
            bordered={false}
            style={{
                width: "100%",
                textAlign: "center",
                margin: "0 auto",
            }}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="productDiv">
                    <div style={{ width: "48%" }}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email",
                                },
                            ]}
                        >
                            <Input placeholder="Product name" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description",
                                },
                            ]}
                        >
                            <TextArea placeholder="description" />
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
                    </div>
                    <div style={{ width: "48%" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                columnGap:"6px"
                            }}
                        >
                            <Form.Item
                                label="Variant Name"
                                name="variantname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your variant!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Button
                                style={{ marginTop: "15px" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Add Variant
                            </Button>
                        </div>

                        {varinatvalue.length > 0 &&
                            varinatvalue.map((item, index) => (
                                <>
                                    <p>
                                        <b>{item.name}</b>
                                    </p>
                                    <div className="inputveriant">
                                        <Input
                                            placeholder="value name"
                                            onChange={(e) =>
                                                setValue(e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="Sotck"
                                            onChange={(e) =>
                                                setValueStock(e.target.value)
                                            }
                                        />
                                        <Button
                                        type="primary"
                                            onClick={() =>
                                                handleVariantValue(index)
                                            }
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {item.value.map((i) => (
                                        <div className="subveriant">
                                            <p>
                                                <b>Name: </b> {i.name}
                                            </p>
                                            <p>
                                                <b>Stock: </b> {i.stock}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            ))}
                    </div>
                </div>
            </Form>
        </Card>
    );
};

export default Addproduct;
