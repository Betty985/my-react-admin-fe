import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import { gc } from '@/hooks';
class Ob {
    x;
    y;
    r;
    cc;
    theta;
    s;
    t;
    dr;
    constructor(x: any, y: number, r: number, cc: string, s: number, c: any, m: any) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.cc = cc;
        this.theta = Math.random() * Math.PI * 2;
        this.s = s;
        this.t = Math.random() * 150;
        this.dr = function () {
            const ls = {
                x: this.x,
                y: this.y,
            };
            this.theta += this.s;
            this.x = m.x + Math.cos(this.theta) * this.t;
            this.y = m.y + Math.sin(this.theta) * this.t;
            c.beginPath();
            c.lineWidth = this.r;
            c.strokeStyle = this.cc;
            c.moveTo(ls.x, ls.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        };
    }
}
export const Mouse: FC<{ width?: number; height?: number }> = (props) => {
    const { width = 600, height = 600 } = props;
    const [size, setSize] = useState({ width, height });
    const [m, setM] = useState({ x: width / 2, y: height / 2 });
    let a: any[] = [];
    useEffect(() => {
        const canvas = document.querySelector('#load') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            onLoad(ctx);
        }
        return () => ctx?.clearRect(0, 0, width, height);
    }, [m.x, m.y]);
    const resize = (ctx: CanvasRenderingContext2D) => {
        setSize({ width: 600, height: 600 });
        for (let i = 0; i < 10; i++) {
            let r = 3;
            a[i] = new Ob(width / 2, height / 2, r, gc(), 0.05, ctx, m);
        }
    };
    const anim = (ctx: CanvasRenderingContext2D) => {
        requestAnimationFrame(() => anim(ctx));
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, width, height);
        a.forEach(function (e, i) {
            e.dr();
        });
    };
    const onLoad = (ctx: CanvasRenderingContext2D) => {
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.9;
        resize(ctx);
        anim(ctx);
    };
    const onMouseMove: MouseEventHandler<HTMLCanvasElement | MouseEvent> = (e) => {
        setM({ x: e.clientX, y: e.clientY });
    };
    return (
        <>
            <canvas
                id="load"
                onMouseMove={onMouseMove}
                width={size.width}
                height={size.height}
            ></canvas>
        </>
    );
};
