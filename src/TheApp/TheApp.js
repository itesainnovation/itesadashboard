import React, {useState, useEffect} from 'react';
import {Breadcrumb, Button, Icon, Layout, Modal, PageHeader, Typography, Drawer} from "antd";
import styles from './theapp.module.scss';
import logo from '../images/logogv.png'
import itesa from '../images/logo-itesa.png'
import {Drawer as TheDrawer} from "../Drawers/Drawer";
import {DrawerMobile} from "../Drawers/DrawerMobile";
import {MenuOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export function TheApp({user}) {

    const [itemOpen, setItemOpen] = useState('pedidos');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {

    },[]);


    return (
        <div className={styles.theHome}>

            <PageHeader
                className={styles.appBar}
                backIcon={false}
                ghost={false}
                onBack={() => null}
                title={<span><Button className={styles.hambButton} onClick={()=>setMobileOpen(!mobileOpen)} type="primary" ghost={true} icon={<MenuOutlined />} /><img src={logo} className={styles.title}/></span>}
                extra={<a className={styles.itesaLogo} href={'https://itesa.co'}><img src={itesa} className={styles.title}/></a>}
            />
            <Layout style={{backgroundColor: '#ffffff'}}>
                <TheDrawer setItemOpen={setItemOpen}/>
                <DrawerMobile setItemOpen={setItemOpen} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen}/>
                <Content className={styles.content}>
                        <Breadcrumb className={styles.breadcrumb}>
                            <Breadcrumb.Item>{itemOpen}</Breadcrumb.Item>
                        </Breadcrumb>


                </Content>
            </Layout>

        </div>
    )
}