import "../styles/register.css"

export default function Registration() {
    return(
        <section className="register">
        <h2>S'inscrire</h2>

        <form className="formRegister" action="">

            <label htmlFor="">Prénom de l'enfant</label>
            <input type="text" />

            <label htmlFor="">Mot de passe</label>
            <input type="text" />

            <label htmlFor="">Confirmation du mot de passe</label>
            <input type="text" />

            <button>S'inscrire</button>

        </form>
        </section>
    )
}