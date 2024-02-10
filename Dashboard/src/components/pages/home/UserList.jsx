import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

const UserList = () => {
    let [usersEmail, setUsersEmail] = useState([]);
    let [usersList, setUsersList] = useState([]);

    useEffect(() => {
        async function user() {
            let user_data = await axios.get(
                "http://localhost:8000/api/v1/auth/alluser"
            );

            setUsersList(user_data.data);

            let useremail = [];

            user_data.data.map((item, index) => {
                useremail.push({
                    text: item.email,
                    value: item.email,
                    key: item._id,
                });
            });
            setUsersEmail(useremail);
        }
        user();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            filters: usersEmail,
            filterSearch: true,
            onFilter: (value, record) => record.email.startsWith(value),
            width: "30%",
        },
        {
            title: "Role",
            dataIndex: "role",
            filters: [
                {
                    text: "User",
                    value: "User",
                },
                {
                    text: "Admin",
                    value: "Admin",
                },
                {
                    text: "Merchant",
                    value: "Merchant",
                },
            ],
            onFilter: (value, record) => record.role.startsWith(value),
            width: "40%",
        },
    ];

    return <Table rowKey="_id" columns={columns} dataSource={usersList} />;
};

export default UserList;
