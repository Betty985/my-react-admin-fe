import { useSetState } from 'ahooks';
import { Button, Card, Col, List, Row, Space } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
function calculateWinner(squares: any[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], coordinates: [a, b, c] };
        }
    }
    return null;
}
const Square: FC<{
    value: number | null;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    hightLight?: boolean;
}> = (props) => {
    const { value, onClick, hightLight = false } = props;
    return (
        <div className={`${styles.square} ${hightLight && styles.hightLight}`} onClick={onClick}>
            {value}
        </div>
    );
};

const Board: FC<{ squares: any[]; handleClick: Function; hightLight?: number[] }> = (props) => {
    const { squares, handleClick, hightLight } = props;
    const getRow = (arr: number[]) =>
        arr.map((i) => (
            <Col key={i}>
                <Square
                    hightLight={hightLight?.includes(i)}
                    value={squares[i]}
                    onClick={() => {
                        handleClick(i);
                    }}
                />
            </Col>
        ));
    const board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];
    return (
        <Card>
            {board.map((i, index) => (
                <Row key={index}>{getRow(i)}</Row>
            ))}
        </Card>
    );
};

export const Game = () => {
    const getMoves = (order: boolean) => {
        const history = state.history;
        const moves = history.map((step, move) => {
            const desc = move ? '🔙  move #' + move + ': ' + step.coordinates : '🔙 game start';
            return (
                <li key={move}>
                    <Button size="small" onClick={() => jumpTo(move)} className="mb-1 w-32">
                        {desc}
                    </Button>
                </li>
            );
        });
        if (!order) {
            return moves.reverse();
        }
        return moves;
    };
    const [state, setState] = useSetState({
        history: [
            {
                squares: Array(9).fill(null),
                coordinates: '',
            },
        ],
        xIsNext: true,
        stepNumber: 0,
    });
    const [curSquares, setCurSquares] = useState(() => state.history[0].squares);
    /** true 升序，false 降序 */
    const [order, setOrder] = useState(true);
    const [moves, setMoves] = useState(() => getMoves(true));

    useEffect(() => {
        setCurSquares(() => {
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            return current.squares.slice();
        });
        setStatus(getStatus());
        setMoves(getMoves(order));
    }, [state.stepNumber]);
    useEffect(() => {
        setMoves(getMoves(order));
    }, [order]);
    const getStatus = () => {
        const res = calculateWinner(curSquares);
        const winner = res?.winner;
        const status = winner
            ? `🎉恭喜玩家 ${winner} 获胜`
            : state.stepNumber === 9
            ? '本局双方平手'
            : '下一位玩家是: ' + (state.xIsNext ? 'X' : 'O');
        return { info: status, hightLight: res?.coordinates };
    };
    const [status, setStatus] = useState(() => getStatus());
    const handleClick = (i: number) => {
        const history = state.history.slice(0, state.stepNumber + 1);
        const squares = curSquares;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const x = Math.floor(i / 3),
            y = Math.floor(i - x * 3);
        squares[i] = state.xIsNext ? 'X' : 'O';
        setCurSquares(squares);
        setState({
            history: history.concat([
                {
                    squares: squares,
                    coordinates: `(${x + 1},${y + 1})`,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !state.xIsNext,
        });
    };
    const jumpTo = (step: number) => {
        setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    };
    const header = (
        <Space onClick={() => setOrder((v) => !v)}>
            <span>历史记录：</span>
            <span className="flex flex-col">
                <CaretUpOutlined style={{ color: order ? 'var(--ant-primary-6)' : '#bfbfbf' }} />
                <CaretDownOutlined
                    style={{
                        color: !order ? 'var(--ant-primary-6)' : '#bfbfbf',
                        marginTop: '-6px',
                    }}
                />
            </span>
        </Space>
    );
    return (
        <>
            <Row justify="center">
                {/* info */}
                <div className={styles.info}>{status.info}</div>
            </Row>
            <Row justify="space-evenly">
                <Col>
                    {/* game */}
                    <Board
                        squares={curSquares}
                        handleClick={handleClick}
                        hightLight={status.hightLight}
                    />
                </Col>
                <Col>
                    <Card bordered>
                        <List header={header}>{moves}</List>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
