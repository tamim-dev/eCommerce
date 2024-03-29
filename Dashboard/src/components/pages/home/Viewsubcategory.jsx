import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { PoweroffOutlined } from "@ant-design/icons";

const Viewsubcategory = () => {
    let loginData = useSelector((state) => state.users.value);
    const [form] = Form.useForm();
    let [subcategory, setSubCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [realtime, setRealtime] = useState(Boolean);
    let [messedit, setMessEdit] = useState("");
    let [mess, setMess] = useState("");
    const [loadings, setLoadings] = useState(false);
    const [loadingstwo, setLoadingsTwo] = useState(false);
    let [values, setValues] = useState("");
    let [editid, setEditid] = useState("");

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
                    category: item.categoryId.name,
                });
            });
            setSubCategory(arr);
        }
        category();
    }, [realtime]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
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
                        ></Button>
                    ) : (
                        loginData.role == "Admin" && (
                            <Button
                                className="buttonWidth"
                                onClick={() => handleApprove(record)}
                                type="primary"
                                ghost
                            >
                                {record.isActive == "Approved"
                                    ? "Disable"
                                    : "Approve"}
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
            "http://localhost:8000/api/v1/product/deletesubcategory",
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
        let subCategoryDelete = await axios.post(
            "http://localhost:8000/api/v1/product/editsubcategory",
            data
        );
        setRealtime(!realtime);

        if (subCategoryDelete.data.success) {
            form.resetFields();
            setIsModalOpen(false);
            setMessEdit(subCategoryDelete.data.success);
        } else if (subCategoryDelete.data.error) {
            setMessEdit(subCategoryDelete.data.error);
        }
    };

    let handleApprove = async (item) => {
        setLoadingsTwo(item.key);
        let data = {
            isActive: item.isActive == "Pending" ? true : false,
            id: item.key,
        };
        let approveCategory = await axios.post(
            "http://localhost:8000/api/v1/product/approvesubcategory",
            data
        );
        console.log(approveCategory);
        setLoadingsTwo("");
        setRealtime(!realtime);
    };

    if (mess || messedit) {
        setTimeout(() => {
            setMess("");
            setMessEdit("");
        }, 4000);
    }

    return (
        <>
            <h1>Sub category</h1>
            <p>{mess}</p>
            <p>{messedit}</p>
            <Table columns={columns} dataSource={subcategory} />;
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleEdit}
                onCancel={handleCancel}
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
                    autoComplete="off"
                    form={form}
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
                        <Input onChange={(e) => setValues(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Viewsubcategory;
