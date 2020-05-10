import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { toArray } from 'antd/lib/form/util';
import { DownOutlined } from '@ant-design/icons';

let db = firebase.firestore();


const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

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
                    { type == 1 && 'Envíos' } 
                    { type == 2 && 'Takeaway' } 
                    { type == 3 && 'Envíos y Takeaway' } 
                    <DownOutlined />
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
    },
];


const TableShops = ({ itemOpen, id }) => {
    const [shopList, setShopList] = useState([])

    useEffect(() => {
        if (id) {

            db.collection('shops').where('userID', '==', id)
                .onSnapshot(function (docs) {
                    let theData = [];
                    docs.forEach(doc => {
                        const shop = doc.data();
                        console.log(shop);
                        shop.key = doc.id;

                        theData = [...theData, shop]
                    })
                    setShopList(theData);
                })
        }
    }, [id])

    return (
        <div>
            {itemOpen}
            <Table dataSource={shopList} columns={columns} />
        </div>
    );
};

export default TableShops;