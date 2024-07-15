import { Link } from "react-router-dom"
import "../styles/footer.css"

export default function Footer () {
    return (
        <>
            <Link href="https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil.html">Pajemploi - Urssaf</Link>
            <Link href="https://www.nounou-top.fr/">Nounou-top</Link>
            <Link href="https://assmat.loire-atlantique.fr/jcms/accueil-assistante-maternelle-fr-local_56369">Assmat-Loire-atlantique</Link>
        </>
    );
}