import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, Select } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Addproduct = () => {
    let [value, setValue] = useState("");
    let [variantvalue, setVariantValue] = useState("");
    let [variant, setVariant] = useState([]);
    let [valuestock, setValueStock] = useState("");
    let [storeId, setStoreId] = useState("");
    let [store, setStore] = useState([]);
    const { TextArea } = Input;
    let ownerId = useSelector((state) => state.users.value);

    useEffect(() => {
        let arr = [];
        async function store() {
            let storeData = await axios.get(
                `http://localhost:8000/api/v1/product/allstore/${ownerId.id}`
            );
            storeData.data.map((item) => {
                // if (item.isActive) {
                arr.push({
                    value: item._id,
                    label: item.storename,
                });
                // }
            });
            setStore(arr);
        }
        store();
    }, []);

    const onFinish = async (values) => {
        // let data = await axios.post(
        //     "http://localhost:8000/api/v1/product/createproduct",
        //     {
        //         name: values.name,
        //         description: values.description,
        //         variant: variant,
        //     }
        // );
        console.log(variant);
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
            name: value,
            stock: valuestock,
        });
        let arr = [...variant];
        setVariant(arr);
    };

    const handleDelete = (index) => {
        let arr = [...variant];
        arr.splice(index, 1);
        setVariant(arr);
    };

    const handleSubDelete = (index, id) => {
        let arr = [...variant];
        arr[index].value.splice(id, 1);
        setVariant(arr);
    };

    let handleChange = (value) => {
        setStoreId(value);
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
                        <Select
                            showSearch
                            style={{
                                width: 200,
                                marginBottom: 20,
                            }}
                            onChange={handleChange}
                            placeholder="Select Brand Name"
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
                            options={store}
                        />
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
                                <Card
                                    key={index}
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                        margin: "10px auto",
                                        background: "#F9F9F9",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "end",
                                        }}
                                    >
                                        <CloseCircleOutlined
                                            onClick={() => handleDelete(index)}
                                            style={{
                                                fontSize: "20px",
                                                color: "red",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </div>
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
                                    {item.value.map((i, id) => (
                                        <Card
                                            style={{
                                                margin: "6px auto",
                                            }}
                                            key={id}
                                        >
                                            <div className="subveriant">
                                                <p>
                                                    <b>Name: </b> {i.name}
                                                </p>
                                                <p>
                                                    <b>Stock: </b> {i.stock}
                                                </p>
                                                <CloseCircleOutlined
                                                    onClick={() =>
                                                        handleSubDelete(
                                                            index,
                                                            id
                                                        )
                                                    }
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "red",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </Card>
                            ))}
                    </div>
                </div>
            </Form>
        </Card>
    );
};

export default Addproduct;
