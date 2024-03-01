import React, { useState } from "react";
import { Button, Form, Input, Card } from "antd";

const Addproduct = () => {
    let [value, setValue] = useState("");
    let [variantvalue, setVariantValue] = useState("");
    let [variant, setVariant] = useState([]);
    let [valuestock, setValueStock] = useState("");
    const { TextArea } = Input;
    const onFinish = async (values) => {
        console.log("submit");
    };

    const handleVariant = () => {
        let arr = [...variant];
        arr.push({
            name: variantvalue,
            value: [],
        });
        setVariant(arr);
    };

    const handleVariantValue = (index) => {
        variant[index].value.push({
            id: Math.random(),
            name: value,
            stock: valuestock,
        });
        let arr = [...variant];
        setVariant(arr);
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
                                columnGap: "6px",
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
                                <Input
                                    onChange={(e) =>
                                        setVariantValue(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Button
                                onClick={handleVariant}
                                style={{ marginTop: "15px" }}
                                type="primary"
                            >
                                Add Variant
                            </Button>
                        </div>

                        {variant.length > 0 &&
                            variant.map((item, index) => (
                                <div key={index}>
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
                                        <div className="subveriant" key={i.id}>
                                            <p>
                                                <b>Name: </b> {i.name}
                                            </p>
                                            <p>
                                                <b>Stock: </b> {i.stock}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            </Form>
        </Card>
    );
};

export default Addproduct;
