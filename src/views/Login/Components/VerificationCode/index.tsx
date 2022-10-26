import React, { FC, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { randomNum } from '@/hooks';
export const VerificationCode: FC<{ onChange: Function }> = (props) => {
    const [change, setChange] = useState(false);
    const { onChange } = props;
    useEffect(() => {
        const canvas = document.getElementById('code') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        let code = '';
        /*绘制4位验证码*/
        for (let i = 4; i > 0; i--) {
            const num = randomNum(0, 9) + '';
            /**设置每个验证码的x,y坐标和旋转角度 */
            const x = (canvas.width / 5) * i + randomNum(-10, 10);
            const y = randomNum(35, 45);
            const r = (randomNum(-30, 30) * Math.PI) / 180;
            code = num + code;
            // 先定原点再旋转
            ctx?.translate(x, y);
            ctx?.rotate(r);
            // fillStyle设置验证码样式，fillText绘制验证码
            ctx!.fillStyle = `rgba(${randomNum(10, 50)},${randomNum(10, 50)},${randomNum(
                10,
                50
            )},0.6)`;
            ctx!.font = `${randomNum(30, 40)}px Arial`;
            ctx!.shadowOffsetX = 3;
            ctx!.shadowOffsetY = 3;
            ctx!.shadowBlur = 3;
            ctx!.shadowColor = 'rgba(0,0,0,0.5)';
            ctx?.fillText(num, 0, 0);
            // 设置完一位验证码后，撤销位移和旋转设置
            ctx?.rotate(-r);
            ctx?.translate(-x, -y);
        }
        /**绘制干扰线和干扰点 */
        ctx?.beginPath();
        for (let i = 0; i < randomNum(2, 4); i++) {
            /*确定干扰线起点和终点坐标*/
            const startX = randomNum(0, canvas.width / 2);
            const startY = randomNum(0, canvas.height);

            const endX = randomNum(canvas.width / 2, canvas.width);
            const endY = randomNum(0, canvas.height);

            /*使用stroke方法绘制干扰线*/
            ctx!.strokeStyle = `rgba(${randomNum(100, 130)},${randomNum(100, 130)},${randomNum(
                100,
                130
            )},${randomNum(0.3, 0.6)})`;
            ctx?.moveTo(startX, startY);
            ctx?.lineTo(endX, endY);
            ctx?.stroke();
        }
        for (let i = 0; i < randomNum(10, 20); i++) {
            /*确定干扰点坐标*/
            let x = randomNum(0, canvas.width);
            let y = randomNum(0, canvas.height);

            /*使用fill方法绘制干扰点，注意干扰点要使用填充方式*/
            ctx!.fillStyle = `rgba(${randomNum(100, 130)},${randomNum(100, 130)},${randomNum(
                100,
                130
            )},${randomNum(0.3, 0.9)})`;
            ctx?.moveTo(x, y);
            /*通过arc方法绘制坐标为（0,0,），半径为1，起点角度为0度，终点角度为360度的圆形黑点（干扰点）*/
            ctx?.arc(x, y, 1, 0, 2 * Math.PI, false);
            ctx?.fill();
        }
        onChange(code);
    }, [change]);
    return (
        <Tooltip title="点击切换">
            <canvas
                id="code"
                width="220"
                height="50"
                onClick={() => setChange((state) => !state)}
            ></canvas>
        </Tooltip>
    );
};
