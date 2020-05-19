import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin, Input } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './tableproducts.module.scss';
import EditableTagGroup from '../Components/EditableTagGroup/EditableTagGroup';
import ActionsCell from '../Components/ActionsCell/ActionsCell';

let db = firebase.firestore();

const fsProdsSet = (id, prop) => {
    const prodDoc = db.collection('products/').doc(id);
    prodDoc.set(prop, { merge: true });
}


const TableProducts = ({ userID }) => {

    const [products, setProducts] = useState([])
    const [editable, setEditable] = useState('')
    const [edit, setEdit] = useState({})

    useEffect(() => {
        if (userID) {

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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value })
    }


    const handleUpdate = (id) => async () => {
        if (editable === '0') {
            await db.collection('products/').add(edit);
        } else {
            fsProdsSet(id, { ...edit });
        }
        setEditable('');
        setEdit({});
    }


    const handleDelete = (key) => () => {
        db.collection('products/').doc(key).delete();
    }


    const removeUnsavedRow = () => {
        if (editable === '0') {
            const removed = products.filter((s) => s.key !== '0')
            setProducts([...removed])
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