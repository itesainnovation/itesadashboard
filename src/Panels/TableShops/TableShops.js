import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin, Input, Popconfirm } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './tableshops.module.scss';
import DropDownTypes from '../Components/DropDownTypes/DropDownTypes';
import ActionsCell from '../Components/ActionsCell/ActionsCell';

let db = firebase.firestore();

const fsShopSet = (id, prop) => {
    const shopDoc = db.collection('shops/').doc(id);
    shopDoc.set(prop, { merge: true });
}


const TableShops = ({ userID }) => {
    const [shops, setShops] = useState([])
    const [editable, setEditable] = useState('')
    const [edit, setEdit] = useState({})

    useEffect(() => {
        if (userID) {

            db.collection('shops').where('userID', '==', userID)
                .onSnapshot(function (docs) {
                    let theData = [];
                    docs.forEach(doc => {
                        const shop = doc.data();
                        shop.key = doc.id;

                        theData = [...theData, shop]
                    })
                    setShops(theData);
                    setEditable('');
                })
        }
    }, [userID])

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value })
    }


    const editProps = (id, prop) => {
        if (id === '0') {
            setEdit({ ...edit, ...prop });
        } else {
            fsShopSet(id, prop);
        }
    }


    const handleType = (id) => (e) => {
        const type = Number(e.key);
        editProps(id, { type });
    }


    const handleSwitch = (id) => (enabled) => {
        editProps(id, { enabled });
    };


    const handleUpdate = (id) => async () => {
        if (editable === '0') {
            await db.collection('shops/').add(edit);
        } else {
            fsShopSet(id, {...edit});
        }
        setEditable('');
        setEdit({});
    }


    const handleDelete = (key) => () => {
        db.collection('shops/').doc(key).delete();
    }


    const handleNew = () => {
        setEdit({
            name: '',
            type: 1,
            enabled: false,
            userID
        })
        setShops([...shops, { key: '0' }])
        setEditable('0');
    }


    const handleCancel = () => {
        if (editable === '0') {
            const removed = shops.filter((s) => s.key !== '0')
            setShops([...removed])
        }
        setEditable('');
        setEdit({});
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

                    <span className={styles.w200}> {name} </span>

                )
            )
        },
        {
            title: 'Modalidad',
            dataIndex: 'type',
            key: 'type',
            render: (type, { key }) => (
                <DropDownTypes type={type} id={key} edit={edit} handleType={handleType} />
            )
        },
        {
            title: 'Habilitada',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled, { key }) => {
                if (key === '0') {
                    enabled = edit.enabled;
                }
                return (
                    <Switch checked={enabled} onClick={handleSwitch(key)} />
                )
            }
        },
        {
            title: 'Acciones',
            dataIndex: 'key',
            key: 'key',
            render: (key) => (
                <ActionsCell values={{editable, edit, id: key}}
                    handlers={{handleUpdate, handleCancel, handleDelete, setEditable}}
                />
            )
        },
    ];


    return (
        <div className={styles.tableContent}>
            <div className={styles.scrollTable}>
                <Spin spinning={!shops.length} delay={400}>
                    <Table
                        bordered
                        dataSource={shops}
                        columns={columns}
                    />
                </Spin>
            </div>
            <Button onClick={handleNew} type="primary" disabled={editable !== ''} className={styles.btnRelative}>
                <span className={styles.btnIcon}>+</span>
                Agregar nueva tienda
            </Button>
        </div>
    );
};

export default TableShops;




