import React from 'react';
import { Mouse, Demo, Scroll } from './components';
export const T: React.FC = () => {
    return (
        <>
            <div id="#container"></div>
            <Demo />
            <Mouse />
            <Scroll />
        </>
    );
};
