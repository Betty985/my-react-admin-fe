import { makeAutoObservable } from 'mobx';
import { initColor } from '@/consts/index';
import { colorsType } from '@/types';

const globalStore = makeAutoObservable({
    theme: initColor,
    setTheme(theme: colorsType) {
        this.theme = theme;
    },
    light: 'dark',
    setLight(sun: 'dark' | 'light') {
        this.light = sun;
    },
    tab: { label: '', key: '' },
    setTab(tab: { label: string; key: string }) {
        this.tab = tab;
    },
});
export default globalStore;
