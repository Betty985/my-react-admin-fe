import React, { FC } from 'react';
import { Col, Row } from 'antd';
import screenfull from 'screenfull';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks';
const MyToolBar: FC = () => {
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
        <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col onClick={screenFull}>
                {state.screenfull ? <FullscreenExitOutlined className='icon'/> : <FullscreenOutlined className='icon'/>}
            </Col>
        </Row>
    );
};
export { MyToolBar };
