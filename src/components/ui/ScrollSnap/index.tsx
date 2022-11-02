import React, { FC, ReactNode } from 'react';
import styles from './index.module.scss';
interface ScrollSnapProps {
    height?: string;
    width?: string;
    align?: string;
    type?: string;
    stickyHead?: ReactNode;
    scrollPadding?: string;
    children: ReactNode[];
}
export const ScrollSnap: FC<ScrollSnapProps> = (props) => {
    const {
        width = '100vw',
        height = '100vh',
        align = 'start',
        type = 'both mandatory',
        stickyHead = null,
        scrollPadding = '0',
        children,
    } = props;
    return (
        <>
            <article
                style={{ width, height, overflow: 'auto', scrollSnapType: type, scrollPadding }}
            >
                <div className={styles.head}>{stickyHead}</div>
                {children.map((item, index) => (
                    <section key={`${Date.now()}${index}`} style={{ scrollSnapAlign: align }}>
                        {item}
                    </section>
                ))}
            </article>
        </>
    );
};
