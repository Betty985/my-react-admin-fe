import React, { useEffect, useRef, useState } from 'react';
/** 15 *15  */
const NUM = 15,
    RADIUS = 12;
const draw = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.beginPath();
    const step = size / NUM;
    for (let i = 1; i <= NUM; i++) {
        ctx.moveTo(step, i * step);
        ctx.lineTo(size, i * step);
        ctx.moveTo(i * step, step);
        ctx.lineTo(i * step, size);
    }
};
const drawChess = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
};
export const Gobang = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [size, setSize] = useState(600);
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = 'black';
            draw(ctx, 550);
            ctx.stroke();
        }
    }, []);
    const handleClick = (e: any) => {
        if (canvasRef.current) {
            const { pageX, pageY } = e;
            const { x, y, left, top } = canvasRef.current.getBoundingClientRect();
            const step = size / NUM;
            const position = {
                x: pageX - x / left - 2 * step,
                y: pageY - y / top - 3 * step,
            };
            const ctx = canvasRef.current.getContext('2d');
            ctx && drawChess(ctx, position.x, position.y);
            console.log(position);
        }
    };
    return <canvas ref={canvasRef} width={size} height={size} onClick={handleClick}></canvas>;
};
