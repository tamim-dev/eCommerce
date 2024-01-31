import React from "react";
import { Col, Row, Menu } from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

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
        getItem("Navigation One", "sub1", <MailOutlined />, [
            getItem("Option 1", "/home/userlist"),
            getItem("Option 2", "/home"),
        ]),
        getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
            getItem("Option 5", "5"),
            getItem("Option 6", "6"),
            getItem("Submenu", "sub3", null, [
                getItem("Option 7", "7"),
                getItem("Option 8", "8"),
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
                        defaultOpenKeys={["sub1"]}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col span={19}>
                    <Outlet/>
                </Col>
            </Row>
        </>
    );
};

export default Home;
