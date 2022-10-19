import React, { FC } from 'react';
import styles from './index.module.scss';
interface FlickerProps {
    width?: string;
    height?: string;
    color?: string;
    radius?: string;
    scale?: number;
}
export const Flicker: FC<FlickerProps> = (props) => {
    const {
        width = '12px',
        height = '12px',
        color = '#67C23A',
        radius = '100px',
        scale = 2,
    } = props;
    return (
        <>
            <div
                className={`${styles.point}  ${styles['point-flicker']}`}
                style={
                    {
                        '--point-width': width,
                        '--point-height': height,
                        '--point-background': color,
                        '--point-border-radius': radius,
                        '--point-scale': scale,
                    } as React.CSSProperties
                }
            ></div>
        </>
    );
};
