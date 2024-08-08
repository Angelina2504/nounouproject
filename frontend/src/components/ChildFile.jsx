import "../styles/childFile.css"

export default function ChildFileFile() {
    return (
        <section className="childFile">
        <h2>Fiche enfant</h2>

        <form className="childForm" action="">
            <label htmlFor="">Nom</label>
            <input type="text" />

            <label htmlFor="">Prénom</label>
            <input type="text" />

            <label htmlFor="">Date de naissance</label>
            <input type="text" />

            <button>Envoyer</button>

        </form>
        </section>
    )
}
