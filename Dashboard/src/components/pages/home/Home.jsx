import React from "react";
import { Col, Row, Menu } from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    let navigate = useNavigate();
    let loginData = useSelector((state) => state.users.value);

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        loginData.role == "Admin" &&
            getItem("User", "sub1", <MailOutlined />, [
                getItem("Users", "/dashboard/userlist"),
            ]),
        getItem("Product", "sub2", <AppstoreOutlined />, [
            getItem("Categroy", "sub3", null, [
                getItem("Add Category", "/dashboard/addcategory"),
                getItem("View Category", "/dashboard/viewcategory"),
            ]),
            getItem("Sub Categroy", "sub5", null, [
                getItem("Add Sub Category", "/dashboard/addsubcategory"),
                getItem("View Sub Category", "/dashboard/viewsubcategory"),
            ]),
            getItem("Product", "sub6", null, [
                getItem("Add Product", "/dashboard/addproduct"),
                getItem("View Product", "/dashboard/viewproduct"),
                getItem("Add Product variant", "/dashboard/addvariant"),
            ]),
        ]),
        {
            type: "divider",
        },
        getItem("Navigation Three", "sub4", <SettingOutlined />, [
            getItem("Add store", "/dashboard/addstore"),
            getItem("View store", "/dashboard/viewstore"),
        ]),
        getItem("Navigation Three", "sub7", <SettingOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
        ]),
    ];
    const onClick = (e) => {
        navigate(e.key);
    };
    return (
        <>
            <Row>
                <Col span={5}>
                    <Menu
                        onClick={onClick}
                        style={{
                            width: "100%",
                        }}
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub2", "sub4", "sub6"]}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col span={19}>
                    <Outlet />
                </Col>
            </Row>
        </>
    );
};

export default Home;
