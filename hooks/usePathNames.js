import { useContext, useEffect } from "react"
import { useRouter } from "next/router";
import { usePhotos } from "../context/PhotosContext";
import AuthContext from "../context/AuthContext"

export const usePathName = () =>{
    const router = useRouter();
    const {isLogged} = useContext(AuthContext)

    useEffect(()=>{
        if(isLogged){
            if(router.pathname === "/signin" || router.pathname === "/signup"){
              router.push("/")
            }
        }else{
            if(router.pathname === "/profile" || router.pathname === "/savedpost" || router.pathname === "/settings"){
                router.push("/")
            }
        }

    },[isLogged])
}