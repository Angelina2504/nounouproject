import "../styles/login.css"

export default function Login() {
    return (
        <section className="login">
        <h2>Se connecter</h2>

        <form className="formLogin" action="">

            <label className="nameChild" htmlFor="">Prénom de l'enfant</label>
            <input type="text" required/>

            <label className="" htmlFor="">Mot de passe</label>
            <input type="text" required/>

            <button>Se connecter</button>
        </form>
        
        </section>
    )
}