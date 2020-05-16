import styles from "./dropdowntypes.module.scss";
import React from 'react'
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const DropDownTypes = ({type, id , edit, handleType}) => {
    if (id === '0') {
        type = edit.type;
    }

    return (
        <Dropdown className={styles.dropDownTypes}
            trigger={['click']}
            overlay={
                <Menu>
                    <Menu.Item key="0" onClick={handleType(id)}>
                        <span> Envíos </span>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="1" onClick={handleType(id)}>
                        <span> Takeaway </span>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="2" onClick={handleType(id)}>
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

export default DropDownTypes;