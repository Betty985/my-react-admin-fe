import React, { FC, useState } from 'react';
import { TrademarkCircleOutlined } from '@ant-design/icons';
import { Col } from 'antd';
import { useToggle } from 'ahooks';
const style = 'pointer-events-none fixed top-0 right-0  w-screen h-screen';
export const Watermark: FC = () => {
    const [state, { toggle, setLeft, setRight }] = useToggle();
    const [base64Url, setBase64Url] = useState('');
    const generateUrl = (text: string = 'REACT ADMIN', color: string) => {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', '200px');
        canvas.setAttribute('height', '200px');
        const ctx = canvas.getContext('2d');
        ctx!.font = '20px Microsoft Yahei';
        ctx!.fillStyle = color;
        ctx?.rotate((45 * Math.PI) / 180);
        ctx?.fillText(text, 50, 50);
        setBase64Url(canvas.toDataURL());
    };
    return (
        <Col
            onClick={() => {
                toggle();
                generateUrl(undefined, 'rgba(98, 178, 98, 1)');
            }}
        >
            <TrademarkCircleOutlined className="icon" />
            {state && (
                <div
                    id="Symbol(watermark-dom)"
                    className={style}
                    style={{ background: `url("${base64Url}") left top repeat`, zIndex: 10000 }}
                ></div>
            )}
        </Col>
    );
};
