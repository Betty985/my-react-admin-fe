import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import React, { FC } from 'react';
import { MSG_403, MSG_404, MSG_500 } from '@/consts/index';
import { useNavigate, useRouteError } from 'react-router-dom';

interface IError {
    status: ResultStatusType;
    subTitle: React.ReactNode;
}
const ErrorComponent: FC<IError> = (props) => {
    const { status, subTitle } = props;
    const navigate = useNavigate();
    return (
        <Result
            status={status}
            title={status}
            subTitle={subTitle}
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Back Home
                </Button>
            }
        />
    );
};
export function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return <ErrorComponent status={error.status} subTitle={error.statusText} />;
}

export const ERROR_403: FC = () => <ErrorComponent status={'403'} subTitle={MSG_403} />;
export const ERROR_404: FC = () => <ErrorComponent status={'404'} subTitle={MSG_404} />;
export const ERROR_500: FC = () => <ErrorComponent status={'500'} subTitle={MSG_500} />;
