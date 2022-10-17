/** 全屏 */
import React, { FC } from 'react';
import { Col } from 'antd';
import screenfull from 'screenfull';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';

export const Fullscreen: FC = () => {
    const [state, setState] = useSetState({
        screenfull: false,
    });
    const screenFull = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
        if (screenfull.isFullscreen) {
            screenfull.exit();
        }
        setState((prev) => ({ screenfull: !prev.screenfull }));
    };
    return (
        <Col onClick={screenFull}>
            {state.screenfull ? (
                <FullscreenExitOutlined className="icon" />
            ) : (
                <FullscreenOutlined className="icon" />
            )}
        </Col>
    );
};
