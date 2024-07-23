import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import "../styles/login.css";

export default function Login() {
const [email,setEmail] = useState("");
const [password, setPassword] = useState("");

const { login }= useAuth();

const handleLogin = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post("http://localhost:3333/auth/login",{
            email,
            password,
        });
            console.log(response)
            console.log(response.data || null)
    login(response.data.user);

    } catch(error){
            console.error(error.response ? error.response.data : error.message);} 
        };

    return (
        <section className="login">
        <h2>Se connecter</h2>

        <form className="formLogin" onSubmit={handleLogin}>

            <label className="nameChild" htmlFor="">Email</label>
            <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>

            <label className="" htmlFor="">Mot de passe</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>

            <button type="submit">Se connecter</button>
        </form>
        
        </section>
    )
}