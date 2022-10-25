import { makeAutoObservable } from 'mobx';
import { initColor } from '@/consts/index';
import { colorsType } from '@/types';

const globalStore = makeAutoObservable({
    theme: initColor,
    setTheme(theme: colorsType) {
        this.theme = theme;
    },
    tab: { label: '', key: '' },

    setTab(tab: { label: string; key: string }) {
        this.tab = tab;
    },
});
export default globalStore;
