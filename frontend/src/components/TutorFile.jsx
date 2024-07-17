import "../styles/tutorFile.css"

export default function TutorFile() {
    return (
        <section className="tutorFile">
        <h2>Fiche d'information des tuteurs</h2>
       
       <form className="tutorForm" action="">

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