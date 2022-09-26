import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import React, { FC } from 'react';
import { MSG_403, MSG_404, MSG_500 } from '@/consts/index';
import { useNavigate } from 'react-router-dom';
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
                        navigate('/login');
                    }}
                >
                    Back Home
                </Button>
            }
        />
    );
};
export const Error_403: FC = () => <ErrorComponent status={'403'} subTitle={MSG_403} />;
export const Error_404: FC = () => <ErrorComponent status={'404'} subTitle={MSG_404} />;
export const Error_500: FC = () => <ErrorComponent status={'500'} subTitle={MSG_500} />;
