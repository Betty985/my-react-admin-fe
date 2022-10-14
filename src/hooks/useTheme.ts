import { useEffect, useRef, useState } from 'react'
import {useStores} from './useStores'
const useTheme=()=>{
    const {globalStore} =useStores()
    const [theme,setTheme]=useState(globalStore.theme)
    const themeRef=useRef(theme)
    themeRef.current=theme
    useEffect(()=>{
        setTheme(globalStore.theme)
    })
    return {theme:themeRef.current}
}
export {useTheme}