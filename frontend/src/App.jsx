import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import '../src/App.css'

function App() {
    return (
    <>
        <Navbar/>

        <section className="page-container">
            
            <Outlet/>
        
        </section> 
        
        <Footer/>

    </>
    );
}

export default App;