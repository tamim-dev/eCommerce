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
            getItem("Users", "/home/userlist"),
        ]),
        getItem("Product", "sub2", <AppstoreOutlined />, [
            getItem("Categroy", "sub3", null, [
                getItem("Add Category", "/home/addcategory"),
                getItem("View Category", "/home/viewcategory"),
            ]),
            getItem("Sub Categroy", "sub5", null, [
                getItem("Add Sub Category", "/home/addsubcategory"),
                getItem("View Sub Category", "/home/viewsubcategory"),
            ]),
            getItem("Product", "sub6", null, [
                getItem("Option 7", "15"),
                getItem("Option 8", "16"),
            ]),
        ]),
        {
            type: "divider",
        },
        getItem("Navigation Three", "sub4", <SettingOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
            getItem("Option 11", "11"),
            getItem("Option 12", "12"),
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
                        defaultOpenKeys={["sub1", "sub2", "sub3", "sub5"]}
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
