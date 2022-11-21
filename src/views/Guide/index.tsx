import React, { useState } from 'react';
import { Button, Divider, Tour } from 'antd';
import type { TourProps } from 'antd';
import { useStores } from '@/hooks';
export const Guide: React.FC = () => {
    const { globalStore } = useStores();
    const [t1, t2, t3] = globalStore.guide;

    const [open, setOpen] = useState<boolean>(false);

    const steps: TourProps['steps'] = [
        {
            title: 'change',
            description: '点击切换菜单类型',
            target: () => t1,
        },
        {
            title: 'toolbar',
            description: '工具栏。含换肤、全屏、搜索等',
            target: () => t2,
        },
        {
            title: 'content',
            description: '标签页和内容区',
            target: () => t3,
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </Button>

            <Divider />

            <Tour open={open} onClose={() => setOpen(false)} steps={steps} arrow={false} />
        </>
    );
};
