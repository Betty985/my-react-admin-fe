import { Col, Row } from 'antd';
import React, { FC } from 'react';
const Square: FC<{ value: any; onClick: React.MouseEventHandler<HTMLDivElement> }> = (props) => {
    const { value, onClick } = props;
    return (
        <div className="square" onClick={onClick}>
            {value}
        </div>
    );
};
const Board: FC<{ onClick: Function }> = (props) => {
    const { onClick } = props;
    const arr1 = [0, 1, 2],
        arr2 = [3, 4, 5],
        arr3 = [6, 7, 8];
    const row1 = arr1.map((i) => (
        <Col>
            <Square
                value={i}
                key={i}
                onClick={() => {
                    onClick(i);
                }}
            />
        </Col>
    ));
    const row2 = arr2.map((i) => (
        <Col>
            <Square
                value={i}
                key={i}
                onClick={() => {
                    onClick(i);
                }}
            />
        </Col>
    ));
    const row3 = arr3.map((i) => (
        <Col>
            <Square
                value={i}
                key={i}
                onClick={() => {
                    onClick(i);
                }}
            />
        </Col>
    ));
    return (
        <>
            <Row>{row1}</Row>
            <Row>{row2}</Row>
            <Row>{row3}</Row>
        </>
    );
};
