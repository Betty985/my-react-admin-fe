import React from 'react';
import { ScrollSnap } from '@/components';
import { Badge, Calendar, Card, Carousel } from 'antd';
import type { Moment } from 'moment';
import type { BadgeProps } from 'antd';
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: 'calc(100vh - 104px - 90px)',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const MyCarousel: React.FC = () => {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    );
};
const Head = (
    <Badge.Ribbon text="Hippies" color="cyan">
        <Card title="Pushes open the window" size="small">
            and raises the spyglass.
        </Card>
    </Badge.Ribbon>
);

export const ScrollDemo: React.FC = () => {
    return (
        <>
            <ScrollSnap
                stickyHead={Head}
                height="calc(100vh - 104px)"
                width="calc(100vw - 100px)"
                scrollPadding="100px"
            >
                <h1
                    className="bg-amber-100 w-full"
                    style={{ height: 'calc(100vh - 104px - 90px)' }}
                >
                    111
                </h1>
                <h1 className="bg-teal-900 w-full" style={{ height: 'calc(100vh - 104px - 90px)' }}>
                    222
                </h1>
                <MyCarousel />
            </ScrollSnap>
        </>
    );
};
