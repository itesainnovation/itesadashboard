import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin } from 'antd';
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
                <a className={'maxContent ant-dropdown-link'} onClick={e => e.preventDefault()}>
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


const TableProducts = ({id}) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        if (id) {
            let db = firebase.firestore();

            db.collection('products').where('userID', '==', id)
                .onSnapshot(function (docs) {
                    let theData = [];
                    docs.forEach(doc => {
                        const prod = doc.data();
                        prod.key = doc.id;

                        theData = [...theData, prod]
                    })
                    console.log( theData );
                    
                    setProducts(theData);
                })
        }
    }, [id])

    return (
        <div className="tableProducts">
            <Spin spinning={!products.length} delay={400}>
            <Table
                bordered
                dataSource={products}
                columns={columns}
            />
        </Spin>
        </div>
    );
};

export default TableProducts;