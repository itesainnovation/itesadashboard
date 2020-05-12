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
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
        render: (price) => (
            '$ ' + price
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
    {
        title: 'Tiendas',
        dataIndex: 'shops',
        key: 'shops',
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