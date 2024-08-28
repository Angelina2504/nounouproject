import TutorFile from "../components/TutorFile";
import ChildFile from "../components/ChildFile";
import { useCheckConnected } from "../hooks/useCheckConnected";


export default function Profile () {

    const { user } = useCheckConnected();

    return (          
        <>
            <p>Page du profil si connecté !</p>
            {/*<TutorFile/>;*/}
            {/*<ChildFile/>*/}
        </>
    );
 }
