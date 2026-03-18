import Recette from '../components/recette/Recette';
import { useRouter } from "next/router"

function RecettePage() {
    const router = useRouter()
    const { id } = router.query

    return <Recette id={id}/>;
}

export default RecettePage;
