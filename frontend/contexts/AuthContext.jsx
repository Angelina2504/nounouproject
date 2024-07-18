import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({Children}) => {
    const[auth, setAuth] = useState(null);

    const login = (userData) =>{
        setAuth(userData);
    };

    const logout = () => {
        setAuth(null);
    
    };
};

return (
<AuthContext.Provider value={{auth, login, logout}}>
   {children} 
</AuthContext.Provider>

)