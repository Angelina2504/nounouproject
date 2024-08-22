import { useState } from "react";
import axiosInstance from "../services/httpClient";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../contexts/AuthContext";

import "../styles/login.css";

export default function Login() {
const [email,setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();
const { login }= useAuth();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axiosInstance.post('/auth/login',{
            email,
            password,
        });

        login(response.data.user);
        navigate("/family"); 

    } catch(error) {
            console.error(error.response ? error.response.data : error.message);} 
    };

    return (
        <section className="login">
        <h2>Se connecter</h2>

        <form className="formLogin" onSubmit={handleLogin}>

            <label htmlFor="">Email</label>
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>

            <label htmlFor="">Mot de passe</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>

            <button type="submit">Se connecter</button>
        </form>
        
        </section>
    )
}
