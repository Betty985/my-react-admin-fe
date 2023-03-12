import React, { FC, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';
import { Spin } from 'antd';

export type EChartsOption = echarts.EChartsOption;
const titleImg =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAHCAYAAACx3+twAAAAAXNSR0IArs4c6QAAAZ9JREFUSEvNlb9LHFEQxz/fE4MXsJEUVhaCndcKqSxVUspZHeS0zIGChYIEXcXGxuLQgzSiohD8Ucr5BwRBWxvRzkJSCXqFsuqOuIrE7O5bDQfxtW/m+2bmzWdGVqWIUUFkSTrGKRny6uXgbxPboIFrZhHjgBwaBxh5feX0Txubp4VG1hB9ib6PF8v4fNMoV5EYZshhrAM5x/s+YoxJyhKWZBcmYDvkEOsoRTDDGD3xgrZGH0GYWIsjqHMyFFSg+qIohlhgAjENNDj8Dwno1wgnkaLMk+Uy/NhiSmGrGAV5nMfZPf+o7ZHlggqkCBrVMKneqKCt0IZYRXQ7gjKMOZqY0gD+i8JU6CbgJ9Dq8K8hhlViOc7GPIoozMPd8ZCXF+34SIv/d4QWaSVgqQ4IbQMdb0UolvknhLZRiuB7RmiOZq4ovxWhxCFov2imRrkOCG0iul6B0HcNcPePCA2pxFY9EEreCk/qtksXxkfnoAo40xeOYwPa4APXfEaODfTgeMuRBvkdGZY/+IRPZ8qghBv24zZQuDQ82oG2FA1fHnv3y0m/CFsHcS4AAAAASUVORK5CYII=';
const bgUrl = 'https://hooks.spicyboy.cn/assets/png/dataScreen-main-rt-4710fe2f.png';
export const Chart: FC<{
    id: string;
    title?: string;
    width?: number;
    height?: number;
    options: EChartsOption;
}> = (props) => {
    const { title = 'GL Hello World', id, width = 320, height = 240, options } = props;
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [load, setLoad] = useState(true);

    const bg = id === 'main' ? 'transparent' : `url(${bgUrl})`;
    useEffect(() => {
        const chartDom = chartRef.current;
        if (chartDom) {
            const myChart = echarts.init(chartDom, 'dark', {
                renderer: 'svg', // 必须使用 SVG 模式
                width, // 需要指明高和宽
                height,
            });
            console.log(myChart);
            myChart.setOption(options);
            setLoad(false);
            window.onresize = function () {
                myChart.resize();
            };
        }
        return () => {
            window.onresize = null;
        };
    }, []);

    return (
        <div
            className={`${styles.container} ${styles[id]}`}
            style={{
                background: bg,
            }}
        >
            <div className={styles.title}>
                <span>{title}</span>
                <img src={titleImg} alt="img" />
            </div>
            {load && (
                <div className="flex items-center justify-center w-full ">
                    <Spin delay={500} />
                </div>
            )}
            <div ref={chartRef} id={id} />
        </div>
    );
};
