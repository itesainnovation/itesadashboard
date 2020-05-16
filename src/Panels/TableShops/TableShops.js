import React, { useState, useEffect } from 'react';
import { Table, Switch, Dropdown, Menu, Button, Spin, Input, Popconfirm } from 'antd';
import 'firebase/firestore';
import firebase from "../../utils/firebase";
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './tableshops.module.scss';

let db = firebase.firestore();

const TableShops = ({ id }) => {
    const [shops, setShops] = useState([])
    const [editable, setEditable] = useState('')
    const [edit, setEdit] = useState({})
    // const [count, setCount] = useState(0)

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
                    setEditable('');
                })
        }
    }, [id])


    const handleType = (key) => (e) => {
        const type = Number(e.key);
        if (editable === '0') {
            setEdit({ ...edit, type })
        } else {
            const shopDoc = db.collection('shops/').doc(key);

            shopDoc.set({ type }, { merge: true });
        }
    }


    const handleSwitch = (key) => (enabled) => {
        if (editable === '0') {
            setEdit({ ...edit, enabled })
        } else {
            const shopDoc = db.collection('shops/').doc(key);

            shopDoc.set({ enabled }, { merge: true });
        }
    };


    const handleUpdate = ({key}) => async () => {
        console.log(edit);
        
        if (edit.name !== '') {
            const shopsColl = db.collection('shops/');

            if (editable === '0') {
                shopsColl.add(edit);
            } else {
                shopsColl.doc(key).set({ ...edit }, { merge: true });
            }
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value })
    }


    const handleDelete = (key) => () => {
        db.collection('shops/').doc(key).delete();
    }


    const handleAdd = () => {
        setEdit({
            name: '',
            type: 1,
            enabled: false,
            // key: '0',
            userID: id
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
    }


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (name, { key }) => (
                (editable === key) ? (

                    <Input name="name" defaultValue={name} onChange={handleChange} style={{ width: 200 }} maxLength="30" autoComplete="off" />

                ) : (

                    <span style={{ width: 200, display: 'inline-block' }}> {name} </span>

                )
            )
        },
        {
            title: 'Modalidad',
            dataIndex: 'type',
            key: 'type',
            render: (type, { key }) => {
                if (key === '0') {
                    type = edit.type;
                }
                return (
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            <Menu>
                                <Menu.Item key="0" onClick={handleType(key)}>
                                    <span> Envíos </span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="1" onClick={handleType(key)}>
                                    <span> Takeaway </span>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="2" onClick={handleType(key)}>
                                    Envíos y Takeaway
                            </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button type="link" className={styles.maxContent + ' ant-dropdown-link'} onClick={e => e.preventDefault()}>
                            {type === 0 && 'Envíos'}
                            {type === 1 && 'Takeaway'}
                            {type === 2 && 'Envíos y Takeaway'}
                            {' '} <DownOutlined />
                        </Button>
                    </Dropdown>
                )
            }
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
            render: (key, shop) => (

                (editable === key) ? (

                    <>
                        <Button onClick={handleUpdate(shop)} type="link" icon={<SaveOutlined />} disabled={edit.name === ''}>
                            Guardar
                        </Button>
                        <Button onClick={handleCancel} type="link" icon={<CloseCircleOutlined />}>
                            Cancelar
                        </Button>
                    </>

                ) : (

                        <>
                            <Button onClick={() => setEditable(key)} type="link" icon={<EditOutlined />}>
                                Editar
                            </Button>
                            <Popconfirm
                                title="¿Desea eliminar la tienda?"
                                onConfirm={handleDelete(key)}
                                okText="Eliminar" cancelText="Volver"
                            >
                                <Button type="link" icon={<DeleteOutlined />}>
                                    Eliminar
                                </Button>
                            </Popconfirm>
                        </>
                    )
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
            <Button onClick={handleAdd} type="primary" disabled={editable !== ''} style={{ float: 'right', position: "relative" }}>
                <span style={{ position: "relative", left: '-0.6rem' }}>+</span>
                Agregar nueva tienda
            </Button>
        </div>
    );
};

export default TableShops;




