import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Form, Input } from "antd";
import { useSelector } from "react-redux";

const Viewsubcategory = () => {
    let loginData = useSelector((state) => state.users.value);
    const [form] = Form.useForm();
    let [subcategory, setSubCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [messedit, setMessEdit] = useState("");
    let [mess, setMess] = useState("");
    const [loadings, setLoadings] = useState(false);
    const [loadingstwo, setLoadingsTwo] = useState(false);

    const showModal = (id) => {
        setIsModalOpen(true);
        setEditid(id.key);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditid("");
    };

    useEffect(() => {
        let arr = [];
        async function category() {
            let subcategoryData = await axios.get(
                "http://localhost:8000/api/v1/product/allsubcategory"
            );

            subcategoryData.data.map((item) => {
                arr.push({
                    key: item._id,
                    name: item.name,
                    isActive: item.isActive ? "Approved" : "Pending",
                });
            });
            setSubCategory(arr);
        }
        category();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Active",
            dataIndex: "isActive",
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <Space>
                    {loginData.role == "Merchant" && (
                        <Button
                            className="buttonWidth"
                            onClick={() => showModal(record)}
                        >
                            Edit
                        </Button>
                    )}
                    {loadings == record.key ? (
                        <Button
                            className="buttonWidth"
                            icon={<PoweroffOutlined />}
                            loading
                            danger
                        >
                            Delete
                        </Button>
                    ) : (
                        <Button
                            className="buttonWidth"
                            danger
                            onClick={() => handleDelete(record)}
                        >
                            Delete
                        </Button>
                    )}
                    {loginData.role == "Admin" && loadingstwo == record.key ? (
                        <Button
                            className="buttonWidth"
                            icon={<PoweroffOutlined />}
                            loading
                            type="primary"
                            ghost
                        >
                            approve
                        </Button>
                    ) : (
                        loginData.role == "Admin" && (
                            <Button
                                className="buttonWidth"
                                onClick={() => handleDelete(record)}
                                type="primary"
                                ghost
                            >
                                approve
                            </Button>
                        )
                    )}
                </Space>
            ),
        },
    ];

    let handleDelete = async (id) => {
        setLoadings(id.key);
        let data = {
            id: id.key,
        };
        let categoryDelete = await axios.post(
            "http://localhost:8000/api/v1/product/deletecategory",
            data
        );
        setRealtime(!realtime);
        if (categoryDelete.data.success) {
            setLoadings("");
            setMess(categoryDelete.data.success);
        }
    };

    let handleEdit = async () => {
        let name = values.charAt(0).toUpperCase() + values.slice(1);
        let data = {
            id: editid,
            name: name,
        };
        let categoryDelete = await axios.post(
            "http://localhost:8000/api/v1/product/editcategory",
            data
        );
        setRealtime(!realtime);

        if (categoryDelete.data.success) {
            form.resetFields();
            setIsModalOpen(false);
        } else if (categoryDelete.data.error) {
            setMessEdit(categoryDelete.data.error);
        }
    };

    return (
        <>
            <Table columns={columns} dataSource={subcategory} />;
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleEdit}
                onCancel={handleCancel}
            >
                <p>{messedit}</p>
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
                    autoComplete="off"
                    form={form}
                >
                    <p>{mess}</p>
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
                        <Input onChange={(e) => setValues(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Viewsubcategory;
