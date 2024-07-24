import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider ({children}) {
    const[auth, setAuth] = useState(null);

    function login(userData){
        setAuth(userData);
    }

    function logout() {
        setAuth(null);
    
    }

    useEffect(()=> {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth)); }
    }, [])

    useEffect(() =>{
     if (auth)  {
        localStorage.setItem("auth", JSON.stringify(auth));}
    else{
        localStorage.removeItem("auth");
    }
    }, [auth]);

return (
<AuthContext.Provider value={{auth, login, logout}}>
   {children} 
</AuthContext.Provider>
)}