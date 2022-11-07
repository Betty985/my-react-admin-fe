import { Col, Modal, Row, Select } from 'antd';
import React, { FC, useState } from 'react';
import Icon, { SearchOutlined } from '@ant-design/icons';
import { list } from '@/consts';
import { useNavigate } from 'react-router-dom';
import { useStores } from '@/hooks';
import { OptionProps } from '@/types';
import { EnterSvg, ESCSvg, DownSvg, UpSvg } from '@/assets';
import styles from './index.module.scss';
const { Option } = Select;
const Footer = () => {
    return (
        <footer>
            <Row justify={'space-around'}>
                <Col>
                    <Icon component={EnterSvg} className={styles.searchSvg} />
                    <span>to select</span>
                </Col>
                <Col>
                    <Icon component={DownSvg} className={styles.searchSvg} />
                    <Icon component={UpSvg} className={styles.searchSvg} />

                    <span>to navigate</span>
                </Col>
                <Col>
                    <Icon component={ESCSvg} className={styles.searchSvg} />
                    <span>to close</span>
                </Col>
            </Row>
        </footer>
    );
};
const MySelect: FC<{ placeholder: any; handleOk: any }> = (props) => {
    const { placeholder, handleOk } = props;
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
                className="w-11/12"
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
                footer={<Footer />}
                keyboard
                width={600}
                bodyStyle={{ minHeight: '400px' }}
            >
                <MySelect placeholder="input search text" handleOk={handleOk} />
            </Modal>
        </Col>
    );
};
