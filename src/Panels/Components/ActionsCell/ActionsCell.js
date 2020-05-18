import React from 'react'
import { Button, Popconfirm } from 'antd'
import { SaveOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

const ActionsCell = ({ values, handlers}) => {
    const { edit, editable, id } = values;
    const { handleUpdate, handleCancel, handleDelete, setEditable } = handlers;
    
    return (
        (editable === id) ? (

            <>
                <Button onClick={handleUpdate(id)} type="link" icon={<SaveOutlined />} disabled={edit.name === ''}>
                    Guardar
                </Button>
                <Button onClick={handleCancel} type="link" icon={<CloseCircleOutlined />}>
                    Cancelar
                </Button>
            </>

        ) : (
            
                <>
                    <Button onClick={() => setEditable(id)} type="link" icon={<EditOutlined />}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="¿Desea eliminar la tienda?"
                        onConfirm={handleDelete(id)}
                        okText="Eliminar" cancelText="Volver"
                    >
                        <Button type="link" icon={<DeleteOutlined />}>
                            Eliminar
                        </Button>
                    </Popconfirm>
                </>

            )
    )
}

export default ActionsCell
