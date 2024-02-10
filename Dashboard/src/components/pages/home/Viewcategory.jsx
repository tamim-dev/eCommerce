import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const Viewcategory = () => {
    let [category, setCategory] = useState([]);

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
        },
    ];
    const data = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
        },
    ];

    return <Table columns={columns} dataSource={category} />;
};

export default Viewcategory;
