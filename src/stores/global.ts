import { makeAutoObservable } from 'mobx';
import { initColor } from '@/consts/index';
import { colorsType } from '@/types';
import { ReactNode } from 'react';

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
    guide: [] as ReactNode[],
    setGuide(props: ReactNode[]) {
        this.guide = props;
    },
});
export default globalStore;
