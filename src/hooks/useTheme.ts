import { useEffect, useRef, useState } from 'react';
import { useStores } from './useStores';
const useTheme = () => {
    const { globalStore } = useStores();
    const [theme, setTheme] = useState(globalStore.theme);
    const [light, setLight] = useState(globalStore.light);
    const themeRef = useRef(theme);
    const lightRef = useRef(light);
    themeRef.current = theme;
    lightRef.current = light;
    useEffect(() => {
        setTheme(globalStore.theme);
        setLight(globalStore.light);
    });
    return { theme: themeRef.current, light: lightRef.current };
};
export { useTheme };
