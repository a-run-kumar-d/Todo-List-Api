import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

type RefreshTrefreshProviderType = {
    children: ReactNode;
}
type RefreshTrefreshtype = {
    trefresh : string
}
type RefreshTrefreshData = {
    gettrefresh: () => string;
    settrefresh: (trefresh: string) => void;
}

const RefreshTrefreshContext = createContext({} as RefreshTrefreshData);
export function useTrefreshData(){
    return useContext(RefreshTrefreshContext);
}
export function RefreshTrefreshProvider({children}: RefreshTrefreshProviderType){
    const [trefresh, setTrefresh] = useLocalStorage<RefreshTrefreshtype>("trefresh",{trefresh : ""});
    function gettrefresh(){
        return trefresh.trefresh;
    }
    function settrefresh(trefresh: string){
        setTrefresh({trefresh : trefresh});
    }
    return(
        <RefreshTrefreshContext.Provider value={{gettrefresh , settrefresh}}>
            {children}
        </RefreshTrefreshContext.Provider>
    )
}