import { Col, Modal, Select } from 'antd';
import React, { FC, ReactNode, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { menu } from '@/consts';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

interface OptionProps {
    label: any;
    key: any;
    icon?: ReactNode;
    children?: OptionProps[];
}
const list = menu
    .map((i) => {
        const { label, key, icon, children } = i;
        if (children) {
            let child = children.map((j: OptionProps) => {
                const tmp = j.key;
                const res = Object.assign(j, { key: `${key}/${tmp}` });
                return res;
            });
            let res = [{ label, key, icon }].concat(child);
            return res;
        } else {
            return i;
        }
    })
    .flat(Infinity) as OptionProps[];

const MySelect: FC<{ placeholder: any; width?: any; handleOk: any }> = (props) => {
    const { placeholder, width = 500, handleOk } = props;
    const navigate = useNavigate();
    const handleChange = (value: string) => {
        navigate(`/${value}`);
        handleOk();
    };

    return (
        <>
            <Select
                style={{ width: width }}
                onChange={handleChange}
                showArrow={false}
                showSearch
                defaultActiveFirstOption={false}
                placeholder={placeholder}
                listHeight={300}
            >
                {list.map((i: OptionProps) => {
                    return (
                        <Option value={i.key} key={i.key}>
                            {i.icon} {i.label}
                        </Option>
                    );
                })}
            </Select>
        </>
    );
};
export const Search = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Col>
            <SearchOutlined className="icon" onClick={showModal} />
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={'hhhh'}
                keyboard
                width={600}
                bodyStyle={{ minHeight: '400px' }}
            >
                <MySelect placeholder="input search text" handleOk={handleOk} />
            </Modal>
        </Col>
    );
};
