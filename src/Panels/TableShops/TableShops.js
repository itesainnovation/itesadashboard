import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin, Input } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './tableshops.module.scss';

let db = firebase.firestore();

const TableShops = ({ id }) => {
    const [shops, setShops] = useState([])
    const [editable, setEditable] = useState('')
    const [edit, setEdit] = useState('')

    useEffect(() => {
        if (id) {

            db.collection('shops').where('userID', '==', id)
                .onSnapshot(function (docs) {
                    let theData = [];
                    docs.forEach(doc => {
                        const shop = doc.data();
                        shop.key = doc.id;

                        theData = [...theData, shop]
                    })
                    setShops(theData);
                })
        }
    }, [id])


    const handleUpdate = (key) => () => {
        const shopDoc = db.collection('shops/').doc(key);
        
        shopDoc.set({
            name: edit,
        }, { merge: true });
        
    }

    
    const handleSwitch = (key) => (check) => {
        const shopDoc = db.collection('shops/').doc(key);

        shopDoc.set({
            enabled: check,
        }, { merge: true });
    };


    const handleChange = (shop) => (e) => {
        console.log('shop', shop);

        setEdit(e.target.value)
    }


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (name, shop) => (
                (editable === shop.key) ? (
                    <Input defaultValue={name} onChange={handleChange(shop)} style={{ width: 200 }} maxLength="30" />
                ) : (
                        <span style={{ width: 200, display: 'inline-block' }}>
                            {name}
                        </span>
                    )
            )
        },
        {
            title: 'Modalidad',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (

                <Dropdown trigger={['click']}
                    overlay={
                        <Menu>
                            <Menu.Item key="0">
                                <span> Envíos </span>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="1">
                                <span> Takeaway </span>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="3"> Envíos y Takeaway </Menu.Item>
                        </Menu>
                    }
                >
                    {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href={undefined} className={styles.maxContent + ' ant-dropdown-link'} onClick={e => e.preventDefault()}>
                        {type === '1' && 'Envíos'}
                        {type === '2' && 'Takeaway'}
                        {type === '3' && 'Envíos y Takeaway'}
                        {' '} <DownOutlined />
                    </a>
                </Dropdown>

            )
        },
        {
            title: 'Habilitada',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (bool, {key}) => (
                <Switch checked={bool} onClick={handleSwitch(key)} />
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'key',
            key: 'key',
            render: (key) => (
                <>
                    <Button onClick={() => setEditable(key)} type="link" icon={<EditOutlined />}>
                        Editar
                    </Button>
                    <Button type="link" icon={<DeleteOutlined />}>
                        Eliminar
                    </Button>


                    {(editable === key) &&
                        <Button onClick={handleUpdate(key)} type="link" icon={<SaveOutlined />}>
                            Guardar
                        </Button>
                    }
                </>

            ),
        },
    ];


    return (
        <div className={styles.tableContent}>
            <Spin spinning={!shops.length} delay={400}>
                <Table
                    bordered
                    dataSource={shops}
                    columns={columns}
                />
            </Spin>
        </div>
    );
};

export default TableShops;




