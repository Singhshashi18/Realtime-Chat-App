import { create } from "zustand";

export const useThemeStore=create((set)=>({
    theme:localStorage.getItem("chat-theme")||"Garden",
    setTheme:(theme)=>{
        localStorage.setItem("chat-theme",theme);
        // document.documentElement.setAttribute("data-theme",theme);
        set({theme});
    },
}));