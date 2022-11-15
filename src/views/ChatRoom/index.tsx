import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import useUrlState from '@ahooksjs/use-url-state';
import { Alert, Button, Card, Col, message, Row, Input, List } from 'antd';
const host = '',
    port = 3000;
type contentType = {
    id: string;
    message: string;
    type?: string;
};

export const ChatRoom = () => {
    const [socket, setSocket] = useState(io());
    const [msg, setMsg] = useState('');
    const [content, setContent] = useState<contentType[]>([]);
    const [userList, setUserList] = useState<string[]>([]);
    // const [query, setQuery] = useUrlState({ port, host });
    const query = { port, host };
    const userInfo = useRef({ id: '', enterTime: 0 });
    const roomState = useRef<{ content: contentType[] }>({ content });
    useEffect(() => {
        initSocket();
        userInfo.current = { id: nanoid(), enterTime: Date.now() };
    }, []);
    useEffect(() => {
        roomState.current.content = content;
    }, [content]);
    const initSocket = () => {
        const { host, port } = query;
        setSocket(() => io(`ws://${host}:${port}`));
        socket.on('connext', () => {
            message.success(host + port + '连接成功');
            socket.emit('user enter', userInfo.current);
        });
        socket.on('user joined', ({ id, userList }) => {
            const newContent: contentType[] = [
                ...roomState.current.content,
                { id, message: `用户${id}加入`, type: 'tip' },
            ];
            setContent(newContent);
            setUserList(userList);
        });
        socket.on('new message', ({ id, message }) => {
            const newContent: contentType[] = [...roomState.current.content, { id, message }];
            setContent(newContent);
        });
        socket.on('user leave', ({ id, useList }) => {
            const newContent: contentType[] = [
                ...roomState.current.content,
                { id, message: `用户${id}离开`, type: 'tip' },
            ];
            setContent(newContent);
            setUserList(userList);
        });
    };
    const handleQuit = () => {
        socket.disconnect();
    };
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const val = e.target.value ?? '';
        setMsg(val);
    };

    const handleSend = () => {
        //客户端发送新消息
        socket.emit('new message', {
            id: userInfo.current.id,
            message,
        });
        setMsg('');
    };
    return (
        <Card>
            <h2>ChatRoom</h2>
            {/* <h2>id:{userInfo.current.id}</h2> */}
            <Row justify="space-around">
                <Col>
                    {content.map((item, index) => {
                        const { id, message, type } = item;
                        return (
                            <div key={`${id}-${index}`}>
                                {type === 'tip' ? (
                                    <Alert message={message} />
                                ) : (
                                    <>
                                        {id}:{message}
                                    </>
                                )}
                            </div>
                        );
                    })}
                    <Input.TextArea
                        cols={76}
                        rows={10}
                        value={msg}
                        onChange={handleChange}
                        onPressEnter={handleSend}
                        showCount
                    />
                    <Button onClick={handleSend}>发送</Button>
                </Col>
                <Col>
                    <p>
                        在线：{userList?.length}人<Button onClick={handleQuit}>离开</Button>
                    </p>

                    <List dataSource={userList} renderItem={(item, index) => item} />
                </Col>
            </Row>
        </Card>
    );
};
