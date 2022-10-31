import React from 'react';
import { Button, Grid } from 'antd';
import { Lock, LockType } from '@/components';
const { useBreakpoint } = Grid;
const url =
    'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1024&amp;h=1280&amp;q=80';
const formUrl = 'https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png';
const class_w = [
    'h-screen flex',
    'basis-6/12 bg-cover bg-white/30 shadow-xl shadow-zinc-500 ',
    'flex flex-col basis-6/12 justify-center items-center  bg-cover bg-right-top',
];
const class_h = [
    'h-screen',
    'h-60 basis-6/12 bg-cover bg-white/30 shadow-xl shadow-zinc-500 bg-center',
    'flex flex-col basis-6/12 justify-center items-center  bg-cover bg-right-bottom pt-28',
];
export const Layout = (props: { children: React.ReactNode }) => {
    const screens = useBreakpoint();
    const classes = screens.lg ? class_w : class_h;
    return (
        <div className={classes[0]}>
            <div className={classes[1]} style={{ backgroundImage: `url(${url})` }}></div>
            <div className={classes[2]} style={{ backgroundImage: `url(${formUrl})` }}>
                {props.children}

                <Lock type={LockType.BUTTON}>
                    <Button type="primary"> 仅vip可用</Button>
                </Lock>
            </div>
        </div>
    );
};
