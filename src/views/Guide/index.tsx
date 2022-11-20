import React, { useRef, useState } from 'react';
import { Button, Divider, Space, Tour } from 'antd';
import type { TourProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

export const Guide: React.FC = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: 'Upload File',
            description: 'Put your files here.',

            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </Button>

            <Divider />

            <Space>
                <Button ref={ref1}> Upload</Button>
                <Button ref={ref2} type="primary">
                    Save
                </Button>
                <Button ref={ref3} icon={<EllipsisOutlined />} />
            </Space>

            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </>
    );
};
