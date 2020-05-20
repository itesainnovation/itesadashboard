import React from 'react';
import { Tag, } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import styles from './editableTagGroup.module.scss'
import { getCollection } from "../../../utils/firebase";

class EditableTagGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            // inputVisible: false,
            // inputValue: '',
        };
    }

    componentDidMount() {

        if (this.props.userID) {
            const shopsCollection = getCollection('shops');
            // Map the Firebase promises into an array
            const arrayPromises = this.props.shopsIds.map(id => {
                return shopsCollection.doc(id).get()
            })

            Promise.all(arrayPromises)
                .then(docs => {
                    let shops = [];
                    docs.forEach(doc => {
                        const shop = doc.data()
                        shop.id = doc.id;
                        shops.push(shop);
                    })
                    this.setState({ tags: shops })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag.id !== removedTag);
        this.setState({ tags });
    };

    // showInput = () => {
    //     this.setState({ inputVisible: true }, () => this.input.focus());
    // };

    // handleInputChange = e => {
    //     this.setState({ inputValue: e.target.value });
    // };

    // handleInputConfirm = () => {
    //     const { inputValue } = this.state;
    //     let { tags } = this.state;
    //     if (inputValue && tags.indexOf(inputValue) === -1) {
    //         tags = [...tags, inputValue];
    //     }
    //     this.setState({
    //         tags,
    //         inputVisible: false,
    //         inputValue: '',
    //     });
    // };

    // saveInputRef = input => (this.input = input);

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag.id);
                }}
            >
                {tag.name}
            </Tag>
        );
        return (
            <span key={tag.id} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };


    render() {
        const { tags, /* inputVisible, inputValue */ } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <div className={styles.EditableTagGroup}>
                <div style={{ marginBottom: 16 }}>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: e => {
                                e.target.style = '';
                            },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                </div>
                {/* {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )} */}
                {/* !inputVisible &&  */(
                    <Tag onClick={this.showInput} className={styles.siteTagPlus}>
                        <PlusOutlined /> Agregar tiendas
                    </Tag>
                )}
            </div>
        );
    }
}

export default EditableTagGroup;
