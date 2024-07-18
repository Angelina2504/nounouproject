import { createContext, useState, useContext } from "react";

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


return (
<AuthContext.Provider value={{auth, login, logout}}>
   {children} 
</AuthContext.Provider>
)}