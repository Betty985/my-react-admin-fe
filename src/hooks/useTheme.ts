import { useEffect, useState } from 'react';
import { useStores } from './useStores';
import { colorsType } from '@/types';
const useTheme = () => {
    const { globalStore } = useStores();
    const [theme, setTheme] = useState<{
        primaryColor: string;
        errorColor: string;
        warningColor: string;
        successColor: string;
        infoColor: string;
    }>(globalStore.theme);
    const [light, setLight] = useState<'dark' | 'light'>(globalStore.light);
    useEffect(() => {
        setTheme(globalStore.theme);
        setLight(globalStore.light);
    }, [globalStore.theme, globalStore.light]);
    const changeTheme = (theme: colorsType) => {
        setTheme(theme);

        globalStore.setTheme(theme);
    };
    const changLight = (sun: 'dark' | 'light') => {
        setLight(sun);

        globalStore.setLight(sun);
    };
    return {
        theme,
        light,
        setTheme: changeTheme,
        setLight: changLight,
    };
};
export { useTheme };
