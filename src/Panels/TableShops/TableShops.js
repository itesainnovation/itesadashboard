import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Modalidad',
        dataIndex: 'type',
        key: 'type',
        render: (type) => (

            <Dropdown trigger={['click']}
                overlay={
                    <Menu className=" text-center">
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
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
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
        render: (bool) => (
            <Switch checked={bool} />
        )
    },
    {
        title: 'Acciones',
        dataIndex: 'Acciones',
        key: 'Acciones',
        render: () => (
            <>
                {false && <Button type="link" icon={<SaveOutlined />}>Guardar</Button>}
                <Button type="link" icon={<EditOutlined />}>Editar</Button>
                <Button type="link" icon={<DeleteOutlined />}>Eliminar</Button>
            </>

        ),
    },
];


const TableShops = ({ id }) => {
    const [shopList, setShopList] = useState([])

    useEffect(() => {
        if (id) {
            let db = firebase.firestore();

            db.collection('shops').where('userID', '==', id)
                .onSnapshot(function (docs) {
                    let theData = [];
                    docs.forEach(doc => {
                        const shop = doc.data();
                        shop.key = doc.id;

                        theData = [...theData, shop]
                    })
                    setShopList(theData);
                })
        }
    }, [id])

    return (
        <div>
            <Table
                bordered
                dataSource={shopList}
                columns={columns}
                /* scroll={{ x: 'max-content' }} */
            />
        </div>
    );
};

export default TableShops;




