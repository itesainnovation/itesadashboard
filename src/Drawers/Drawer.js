import React, {useState, useEffect} from 'react';
import { Menu, Layout} from "antd";
import styles from './drawer.module.scss'
import {UserOutlined, ShoppingCartOutlined, HomeOutlined, InboxOutlined} from '@ant-design/icons';
const {  Sider, Content } = Layout;
const { SubMenu } = Menu;

export function Drawer({setItemOpen}) {

    useEffect(() => {

    });
    const handleClick = e => {
        setItemOpen(e.keyPath);
    };
    return (
        <Sider breakpoint="md" collapsedWidth="0" className={styles.drawer} width={200} style={{ background: '#fff' }}>
            <Menu
                onClick={handleClick}
                mode="inline"
                defaultSelectedKeys={['pedidos']}
                style={{ height: '100%' }}
            >
                <Menu.Item icon={<InboxOutlined />} key="pedidos">Pedidos</Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key="tiendas">Tiendas</Menu.Item>
                <Menu.Item icon={<ShoppingCartOutlined />} key="Productos">Productos</Menu.Item>
                <Menu.Item icon={<UserOutlined />} key="Mi cuenta">Mi cuenta</Menu.Item>

            </Menu>
        </Sider>
    )
}