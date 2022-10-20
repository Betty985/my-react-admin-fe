import React, { FC, cloneElement, useEffect, useState } from 'react';
import { getLoginInfo, isEmptyObject } from '@/hooks';
import { ERROR_403 } from '../ErrorPage';
const permissionCheck = async () => {
    const loginInfo = await getLoginInfo();
    if (isEmptyObject(loginInfo)) {
        return false;
    }
    return loginInfo.username === 'vip';
};
export enum LockType {
    'PAGE',
    'BUTTON',
}
interface LockProps {
    children: React.ReactElement;
    type: LockType;
}
export const Lock: FC<LockProps> = (props) => {
    const { children, type } = props;
    const [allowed, setIsAllowed] = useState<boolean>();
    useEffect(() => {
        const check = async () => {
            let res = await permissionCheck();
            setIsAllowed(res);
        };
        check();
    }, []);
    if (allowed) {
        return <>{children}</>;
    } else {
        if (type === LockType.PAGE) {
            return <ERROR_403 />;
        } else if (type === LockType.BUTTON) {
            const newOne = cloneElement(props.children, { disabled: true });
            return <>{newOne}</>;
        } else {
            return <></>;
        }
    }
};
// const A=<Button>11</Button>
// const B=(props)=><Button type={props.type}>11</Button>
