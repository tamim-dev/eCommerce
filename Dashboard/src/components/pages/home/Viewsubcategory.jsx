import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const Viewsubcategory = () => {
    let [subcategory, setSubCategory] = useState([]);

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
        },
    ];
  return <Table columns={columns} dataSource={subcategory} />;
};

export default Viewsubcategory;
