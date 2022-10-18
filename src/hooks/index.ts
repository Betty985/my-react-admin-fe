export * from './repeat';
export * from './useStores';
export * from './useTheme';
export const type = (i: unknown) => Object.prototype.toString.call(i).slice(8, -1).toLowerCase();
