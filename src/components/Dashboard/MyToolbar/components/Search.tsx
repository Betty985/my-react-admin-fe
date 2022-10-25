import { Col, Modal, Select } from 'antd';
import React, { FC, ReactNode, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { list } from '@/consts';
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/hooks';
import { OptionProps } from '@/types';
const { Option } = Select;

const MySelect: FC<{ placeholder: any; width?: any; handleOk: any }> = (props) => {
    const { placeholder, width = 500, handleOk } = props;
    const { globalStore } = useStores();
    const navigate = useNavigate();
    const handleChange = (value: string) => {
        navigate(`/${value}`);
        globalStore.setTab({ label: value, key: value });
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
