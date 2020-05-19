import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './tableproducts.module.scss';
import EditableTagGroup from '../Components/EditableTagGroup/EditableTagGroup';


const TableProducts = ({ userID }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        if (userID) {
            let db = firebase.firestore();

            db.collection('products').where('userID', '==', userID)
                .onSnapshot(function (docs) {
                    let prods = [];
                    docs.forEach(doc => {
                        const prod = doc.data();
                        prod.key = doc.id;

                        prods.push(prod)
                    })

                    setProducts(prods);
                })
        }
    }, [userID])


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Precio',
            className: styles.columnMoney,
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                '$ ' + price
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'key',
            key: 'key',
            render: () => (
                <>
                    {false && <Button type="link" icon={<SaveOutlined />}>Guardar</Button>}
                    <Button type="link" icon={<EditOutlined />}>Editar</Button>
                    <Button onClick={() => {console.log('asd')}} type="link" icon={<DeleteOutlined />}>Eliminar</Button>
                </>

            ),
        },

    ];


    return (
        <div className={styles.tableContent}>
            <div className={styles.scrollTable}>
                <Table loading={{ spinning: !products.length, delay: 400 }}
                    dataSource={products}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => (<>
                            <EditableTagGroup shopsIds={record.shops} userID={userID} />
                        </>),
                        rowExpandable: record => record.shops.length,
                        expandIconColumnIndex: 4,
                    }}
                />
            </div>
            <Button onClick={null} type="primary" disabled={null} className={styles.btnRelative}>
                <span className={styles.btnIcon}>+</span>
                Agregar nuevo producto
            </Button>
        </div>
    );
};

export default TableProducts;