import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

type AccessTokenProviderType = {
    children: ReactNode;
}
type AccessTokentype = {
    token : string
}
type AccessTokenData = {
    gettoken: () => string;
    settoken: (token: string) => void;
}

const accessTokenContext = createContext({} as AccessTokenData);
export function useTokenData(){
    return useContext(accessTokenContext);
}
export function AccessTokenProvider({children}: AccessTokenProviderType){
    const [token, setToken] = useLocalStorage<AccessTokentype>("token",{token : ""});
    // useEffect(()=>{
    //     console.log(token);
    // },[token])
    function gettoken(){
        return token.token;
    }
    function settoken(token: string){
        setToken({token : token});
    }
    return(
        <accessTokenContext.Provider value={{gettoken , settoken}}>
            {children}
        </accessTokenContext.Provider>
    )
}