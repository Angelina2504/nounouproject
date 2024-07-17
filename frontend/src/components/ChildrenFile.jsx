import "../styles/childrenFile.css"

export default function ChildrenFile() {
    return (
        <section className="childrenFile">
        <h2>Fiche enfant</h2>

        <form className="childrenForm" action="">
            <label htmlFor="">Nom</label>
            <input type="text" />

            <label htmlFor="">Prénom</label>
            <input type="text" />

            <label htmlFor="">Date de naissance</label>
            <input type="text" />

        </form>
        </section>
    )
}