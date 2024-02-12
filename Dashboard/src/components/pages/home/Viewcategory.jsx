import axios from "axios";
import { Button, Space, Table, Input, Modal, Form } from "antd";
import React, { useEffect, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";

const Viewcategory = () => {
    let [category, setCategory] = useState([]);
    let [realtime, setRealtime] = useState(Boolean);
    let [mess, setMess] = useState("");
    let [messedit, setMessEdit] = useState("");
    let [values, setValues] = useState("");
    let [editid, setEditid] = useState("");
    const [loadings, setLoadings] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

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
            let categoryData = await axios.get(
                "http://localhost:8000/api/v1/product/allcategory"
            );

            categoryData.data.map((item) => {
                arr.push({
                    key: item._id,
                    name: item.name,
                    isActive: item.isActive ? "Approved" : "Pending",
                });
            });
            setCategory(arr);
        }
        category();
    }, [realtime]);

    if (mess || messedit) {
        setTimeout(() => {
            setMess("");
            setMessEdit("");
        }, 4000);
    }

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
            setLoadings("");
            form.resetFields();
            setIsModalOpen(false);
        } else if (categoryDelete.data.error) {
            setMessEdit(categoryDelete.data.error);
        }
    };

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
                    {loadings == record.key ? (
                        <Button
                            className="buttonWidth"
                            icon={<PoweroffOutlined />}
                            loading
                        >
                            Edit
                        </Button>
                    ) : (
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
                        >
                            Delete
                        </Button>
                    ) : (
                        <Button
                            className="buttonWidth"
                            onClick={() => handleDelete(record)}
                        >
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <h3>Category</h3>
            <p>{mess}</p>
            <Table columns={columns} dataSource={category} />
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

export default Viewcategory;
