import { action, makeAutoObservable } from "mobx";
import { initColor } from "@/consts";
import {colorsType} from '@/types' 
const globalStore=makeAutoObservable({
    theme:initColor,
    setTheme(theme:colorsType){
        this.theme=theme
    }
})
export default globalStore