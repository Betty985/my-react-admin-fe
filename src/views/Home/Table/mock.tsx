import { repeat } from '@/hooks';
import { Tag } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
const format = 'YYYY/MM/DD ';
const d1 = dayjs('2019-01-25').format(format);
const d2 = dayjs('2020-02-10').format(format);
const d3 = dayjs('2022-11-05').format(format);
const d4 = dayjs().format(format);
const success = <Tag color="success">success</Tag>;
const processing = <Tag color="processing">processing</Tag>;
const error =<Tag color="error">error</Tag>;
const warn = <Tag color="warning">warning</Tag>;
const initData = [
    [success, 'tag', '表单数据由React组件负责处理', d1],
    [processing, 'button', '正则表达式是用于匹配字符串中字符组合的模式', d2],
    [error, 'table', '正则表达式是用于匹配字符串中字符组合的模式', d3],
    [warn, 'alert', '正则表达式是用于匹配字符串中字符组合的模式', d4],
];
export const data = repeat(initData, 1000);
