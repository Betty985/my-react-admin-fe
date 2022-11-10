import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Chart } from './component/Chart';
import { stackedOpt, mapOpt } from './options';
export const ScreenContainer: FC<{
    designDraftWidth?: number;
    designDraftHeight?: number;
    children: ReactNode;
}> = (props) => {
    // const { designDraftWidth = 1920, designDraftHeight = 960 } = props;
    const { designDraftWidth = 1490.91, designDraftHeight = 760.91, children } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scale, setScale] = useState<number>(1);
    const handleScreenAuto = () => {
        const aspectRatio = designDraftWidth / designDraftHeight;
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            const scaleRes =
                clientWidth / clientHeight < aspectRatio
                    ? clientWidth / designDraftWidth
                    : clientHeight / designDraftHeight;
            setScale(scaleRes);
        }
    };
    useEffect(() => {
        handleScreenAuto();
        window.onresize = () => handleScreenAuto();
        return () => {
            window.onresize = null;
        };
    }, []);
    return (
        <div className={styles.screenContainer} ref={containerRef}>
            <div
                className={styles.screen}
                style={{
                    width: designDraftWidth,
                    height: designDraftHeight,
                    transform: `scale(${scale}) translate(-50%,-50%)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
export const BigScreen = () => {
    return (
        <ScreenContainer>
            <header className={styles.header}>大数据可视化展示平台</header>
            <Chart id="s0" options={stackedOpt} title="指标S0" />
            <Chart id="s1" options={stackedOpt} title="指标S1" />
            <Chart id="s2" options={stackedOpt} title="指标S2" height={150} />
            <Chart id="s3" options={stackedOpt} title="指标S3" height={150} />
            <Chart id="s4" options={stackedOpt} title="指标S4" height={100} />
            <Chart id="s5" options={stackedOpt} title="指标S5" height={100} />
            <Chart id="main" options={mapOpt} height={300} />
        </ScreenContainer>
    );
};
