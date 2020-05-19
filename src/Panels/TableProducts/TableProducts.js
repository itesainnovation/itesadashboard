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
                    let theData = [];
                    docs.forEach(doc => {
                        const prod = doc.data();
                        prod.key = doc.id;

                        theData = [...theData, prod]
                    })
                    console.log(theData);

                    setProducts(theData);
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
                    <Button type="link" icon={<DeleteOutlined />}>Eliminar</Button>
                </>

            ),
        },

    ];


    return (
        <div className={styles.tableContent}>
            <div className={styles.scrollTable}>
                <Spin spinning={!products.length} delay={400}>
                    <Table
                        bordered
                        dataSource={products}
                        columns={columns}
                        expandable={{
                            expandedRowRender: record => (<>
                                <EditableTagGroup /> <p style={{ margin: 0 }}>{record.shops}</p>
                            </>),
                            rowExpandable: record => record.shops.length,
                            expandIconColumnIndex: 4,

                        }}
                    />
                </Spin>
            </div>
            {/* <Button onClick={handleNew} type="primary" disabled={editable !== ''} className={styles.btnRelative}>
                <span className={styles.btnIcon}>+</span>
                Agregar nueva tienda
            </Button> */}
        </div>
    );
};

export default TableProducts;