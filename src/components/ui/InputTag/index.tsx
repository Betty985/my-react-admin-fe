import type { InputRef } from 'antd';
import { Input, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import React, { useRef, useState } from 'react';
import { colorMap } from '@/consts';
export const InputTag: React.FC<{ getTags: Function }> = (props) => {
    const { getTags } = props;
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        getTags(newTags);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
            getTags([...tags, inputValue]);
        }
        setInputValue('');
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
                color={colorMap.get(tag) || 'orange'}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);
    return (
        <>
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                placeholder="input tags"
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
            <div style={{ marginTop: 16 }}>
                <TweenOneGroup
                    enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                    }}
                    onEnd={(e) => {
                        if (e.type === 'appear' || e.type === 'enter') {
                            (e.target as any).style = 'display: inline-block';
                        }
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                >
                    {tags.length > 0 && tagChild}
                </TweenOneGroup>
            </div>
        </>
    );
};
