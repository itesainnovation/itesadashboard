import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import {getCollection, collectionSnapshot, docSet} from "../../utils/firebase";
import styles from './tableorders.module.scss';
import EditableTagGroup from '../Components/EditableTagGroup/EditableTagGroup';
import ActionsCell from '../Components/ActionsCell/ActionsCell';


const ordersCollection = getCollection('orders');


/* --TableOrders Component-- */

const TableOrders = ({ userID }) => {
    const [orders, setOrders] = useState([])
    const [editable, setEditable] = useState('')
    const [edit, setEdit] = useState({})

    useEffect(() => {
        collectionSnapshot(userID, ordersCollection, setOrders)
    }, [userID])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value })
    }


    const handleUpdate = (id) => async () => {
        if (editable === '0') {
            await ordersCollection.add(edit);
        } else {
            docSet(ordersCollection, id, { ...edit });
        }
        setEditable('');
        setEdit({});
    }


    const handleDelete = (key) => () => {
        ordersCollection.doc(key).delete();
    }


    const removeUnsavedRow = () => {
        if (editable === '0') {
            const removed = orders.filter((s) => s.key !== '0')
            setOrders([...removed])
        }
    }


    const handleCancel = () => {
        removeUnsavedRow();
        setEditable('');
        setEdit({});
    }


    const handleEditable = (id) => {
        removeUnsavedRow();
        setEditable(id);
    }


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (name, { key }) => (
                (editable === key) ? (

                    <Input name="name" defaultValue={name}
                        onChange={handleChange} className={styles.w200}
                        maxLength="30" autoComplete="off"
                    />

                ) : (

                    <span> {name} </span>

                )
            )
        },
        {
            title: 'Precio',
            className: styles.columnMoney,
            dataIndex: 'price',
            key: 'price',
            render: (price, { key }) => (
                (editable === key) ? (

                    <Input name="price" defaultValue={price} type="number"
                        onChange={handleChange} className={styles.wPrice}
                        maxLength="12" autoComplete="off"
                    />

                ) : (

                    <span className={styles.wPrice}>$ {price} </span>

                )
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'key',
            key: 'key',
            render: (key) => (
                <ActionsCell values={{ editable, edit, id: key }}
                    handlers={{ handleUpdate, handleCancel, handleDelete, handleEditable }}
                />
            )
        },

    ];


    return (
        <div className={styles.tableContent}>
            <div className={styles.scrollTable}>
                <Table loading={{ spinning: !orders.length, delay: 400 }}
                    dataSource={orders}
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

export default TableOrders;