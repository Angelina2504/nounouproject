import { Link } from "react-router-dom"
import "../styles/footer.css"

export default function Footer () {
    return (
        <div className="allLink">
            <Link target="_blank" to="https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil.html">Pajemploi - Urssaf</Link>
            <Link target="_blank" to="https://www.nounou-top.fr/">Nounou-top</Link>
            <Link target="_blank"to="https://assmat.loire-atlantique.fr/jcms/accueil-assistante-maternelle-fr-local_56369">Assmat-Loire-atlantique</Link>
        </div>
    );
}