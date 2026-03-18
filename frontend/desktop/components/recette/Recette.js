import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFire, faGauge } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react";
import NumberButton from "../utile/NumberButton"
import TitleBar from "../utile/TitleBar"
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link"

import styles from "../../styles/recette/Recette.module.css"


function Recette({ id }) {
    const token = useSelector((state) => state.token.token);
    const router = useRouter();
    const [recette, setRecette] = useState({ingredients: [], etapes: [], dressages:[]});
    const [nbPersonne, setNbPersonne] = useState(1);

    const style = {
        backgroundImage: `
            linear-gradient(
                rgba(0,0,0,0.4),
                rgba(0,0,0,0.4)
            ),
            url(${recette.img})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        color: "white",
        boxSizing: "border-box",
        padding: "clamp(16px, 3vw, 48px)",
    };

    const [checked, setChecked] = useState([]);

    function toggleIngredient(i) {
        setChecked(prev =>
            prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
        );
    }

    useEffect(() => {
        if (token === null)
        {
            router.push('/authentification')
        }
        const fetchRecette = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recette/get_by_id`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify({ id: id })
            });

            const data = (await response.json()).recette;
            setRecette(data);
        };

        fetchRecette();

    }, [token, id]);

  return (
    <div className={styles.body}>
        <div style={style}>
            <Link href="/">
                <p className={styles.linkAcceuil}>← Accueil</p>
            </Link>
            <div className={styles.centerTitre}>
                <h1 className={styles.title}>
                    {recette.title}
                </h1>
                <h6 className={styles.description}>
                    {recette.description}
                </h6>
            </div>
        </div>

        <div className={styles.icons}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faClock} />
                <p>
                    {recette.temps_de_preparation} min
                </p>
            </div>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faFire} />
                <p>
                    {recette.temps_de_cuisson} min
                </p>
            </div>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faGauge} />
                <p>
                    {recette.difficulte}
                </p>
            </div>
        </div>
        
        <br />
        <br />
        <br />
        <TitleBar>
            <h3 className={styles.text}>Ingrédients</h3>
            <NumberButton onChange={setNbPersonne}/>
        </TitleBar>

        <div className={styles.ingredients}>
            <ul className={styles.ingredientsList}>
                {recette.ingredients.map((ingredient, i) => (
                    <li onClick={() => toggleIngredient(i)} className={checked.includes(i) ? styles.checked : ""}>
                        {ingredient.quantity * nbPersonne} {ingredient.unite} {ingredient.el}
                    </li>
                ))}
            </ul>
        </div>

        <br />
        <br />
        <br />

        <TitleBar>
            <h3 className={styles.text}>Étapes</h3>
        </TitleBar>

        <div className={styles.ingredients}>
            <ul className={styles.ingredientsList}>
                {recette.etapes.map((etape, i) => (
                    <li onClick={() => toggleIngredient(i)} className={checked.includes(i) ? styles.checked : ""}>
                        {etape}
                    </li>
                ))}
            </ul>
        </div>

        <br />
        <br />
        <br />

        <TitleBar>
            <h3 className={styles.text}>Dressages</h3>
        </TitleBar>

        <div className={styles.ingredients}>
            <ul className={styles.ingredientsList}>
                {recette.dressages.map((dressage, i) => (
                    <li onClick={() => toggleIngredient(i)} className={checked.includes(i) ? styles.checked : ""}>
                        {dressage}
                    </li>
                ))}
            </ul>
        </div>

        {
            recette.notes !== "" ?
            <div>
                <br />
                <br />
                <br />
                <TitleBar>
                    <h3 className={styles.text}>Notes</h3>
                </TitleBar>

                <div className={styles.notes}>
                    {recette.notes}
                </div>
            </div> : null
        }
    </div>
    );
}

export default Recette