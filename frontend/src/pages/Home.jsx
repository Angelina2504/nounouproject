import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckConnected } from "../hooks/useCheckConnected";

export default function Home (){
    const navigate = useNavigate();
    const { user } = useCheckConnected();

    useEffect(() => {
        if (user) {
            navigate("/family");
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>
        <p>Home</p>
        </>
    );
}
