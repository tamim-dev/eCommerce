import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, Select } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Addproduct = () => {
    let [value, setValue] = useState("");
    let [variantvalue, setVariantValue] = useState("");
    let [variant, setVariant] = useState([]);
    let [valuestock, setValueStock] = useState("");
    let [storeId, setStoreId] = useState("");

    let [images, setImages] = useState("");
    let [imagePrev, setImagePrev] = useState("");
    let [description, setDescription] = useState("");
    let [store, setStore] = useState([]);

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
        let data = await axios.post(
            "http://localhost:8000/api/v1/product/createproduct",
            {
                name: values.name,
                description: description,
                regularprice: values.regularprice,
                salesprice: values.salesprice,
                quantity: values.quantity,
                // variant: variant,
                avatar: images,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
     
    };

 

    let handleChange = (value) => {
        setStoreId(value);
    };

    let handleImage = (value) => {
        setImages(value.target.files[0]);
        setImagePrev(URL.createObjectURL(value.target.files[0]));
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
                    <div style={{ width: "100%" }}>
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

                        <Form.Item>
                            <CKEditor
                                editor={ClassicEditor}
                                onReady={(editor) => {
                                    console.log(
                                        "Editor is ready to use!",
                                        editor
                                    );
                                }}
                                onChange={(event, value) => {
                                    setDescription(value.getData());
                                }}
                                onBlur={(event, editor) => {
                                    console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log("Focus.", editor);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Regular price"
                            name="regularprice"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Regular price",
                                },
                            ]}
                        >
                            <Input placeholder="Regular price" />
                        </Form.Item>
                        <Form.Item
                            label="Sales price"
                            name="salesprice"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Sales price",
                                },
                            ]}
                        >
                            <Input placeholder="Sales price" />
                        </Form.Item>
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Quantity",
                                },
                            ]}
                        >
                            <Input placeholder="Product quantity" />
                        </Form.Item>
                        <div>
                            <Form.Item
                                wrapperCol={{
                                    offset: 0,
                                    span: 100,
                                }}
                            >
                                <Select
                                    showSearch
                                    style={{
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
                                                (
                                                    optionB?.label ?? ""
                                                ).toLowerCase()
                                            )
                                    }
                                    options={store}
                                />
                            </Form.Item>
                            <input type="file" onChange={handleImage} />
                            <img width={200} src={imagePrev} />
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
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Card>
    );
};

export default Addproduct;
