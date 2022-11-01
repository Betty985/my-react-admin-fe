export * from './repeat';
export * from './useStores';
export * from './useTheme';
export const type = (i: unknown) => Object.prototype.toString.call(i).slice(8, -1).toLowerCase();
export { getLoginInfo } from '@/views/Login/login';
/**
 *
 * @param obj 对象
 * @returns 是否为空对象
 */
export const isEmptyObject = (obj: Object) => JSON.stringify(obj) === '{}';
/**
 * @description 生成随机数
 * @param minNum
 * @param maxNum
 * @returns
 */
export const randomNum = (minNum: number, maxNum: number) =>
    Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
/**
 * @description 生成随机颜色
 * @returns
 */
export function gc() {
    const s = '0123456789ABCDEF';
    let c = '#';
    for (var i = 0; i < 6; i++) {
        c += s[Math.ceil(Math.random() * 15)];
    }
    return c;
}
