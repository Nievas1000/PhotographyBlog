import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Context = createContext({});

export function ContextAuthProvider({ children }) {
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState({})
  const [isLogged, setIsLogged] = useState(false)
  const [amountPost, setAmount] = useState()
  const router = useRouter()

  useEffect(async () =>{
    try {
      let result = await axios.get('http://localhost:3001/session')
      if(result.data.loggedIn === true){
        setIsLogged(true)
        saveUser(result.data.user[0])
      }
    } catch (error) {
      console.log(error)
    }
  },[isLogged])

  const saveUser = (user) =>{
    setUser({
      ...user
    })
  }
  return (
    <Context.Provider value={{ user, saveUser, isLogged, setIsLogged}}>
      {children}
    </Context.Provider>
  );
}

export default Context;
