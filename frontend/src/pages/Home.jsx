import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home (){
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if (auth) {
            navigate("/family");
        };
    }, [auth, navigate]);

    return (
        <>
        <p>Home</p>
        </>
    );
}