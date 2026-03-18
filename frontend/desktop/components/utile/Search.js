import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/utile/Search.module.css';

function SearchInList(el, list) {
    if (el.length === 0) {
        return [];
    }

    console.log(el, list)

    return list.filter((element) =>
        element.toLowerCase().startsWith(el.toLowerCase())
    );
}

export default function Search ({ onChange }) {
    const [contents, setContents] = useState([]);
    const [input, setInput] = useState("");
    const [isSelect, setIsSelect] = useState("");

    const uniteList = [
        "g",
        "kg",
        "mg",
        "ml",
        "cl",
        "dl",
        "l",
        "c. à c.",
        "c. à s.",
        "cuillère à dessert",
        "cuillère à moka",
        "demi-cuillère à café",
        "demi-cuillère à soupe",
        "pincée de",
        "grosse pincée de",
        "pointe de",
        "soupçon de",
        "trait de",
        "filet de",
        "zeste de",
        "copeaux de",
        "râpures de",
        "grain de",
        "grains de",
        "tour de moulin",
        "tours de moulin",
        "unité de",
        "pièce de",
        "morceau de",
        "tranche de",
        "rondelle de",
        "cube de",
        "carré de",
        "lamelle de",
        "copeau de",
        "quartier de",
        "demi de",
        "gousse de",
        "gousses de",
        "tête de",
        "botte de",
        "bouquet de",
        "bouquet garni",
        "feuille de",
        "feuilles de",
        "branche de",
        "branches de",
        "brin de",
        "brins de",
        "tige de",
        "tiges de",
        "poignée de",
        "petite poignée de",
        "grosse poignée de",
        "poignée généreuse de",
        "noisette de",
        "noix de",
        "boule de",
        "boules de",
        "boulette de",
        "boulettes de",
        "quenelle de",
        "verre de",
        "demi-verre de",
        "tasse de",
        "bol de",
        "louche de",
        "pot de",
        "bocal de",
        "boîte de",
        "conserve de",
        "sachet de",
        "paquet de",
        "tube de",
        "barquette de",
        "plaquette de",
        "bloc de",
        "brique de",
        "flacon de",
        "bouteille de",
        "canette de",
        "pack de",
        "rouleau de",
        "pâte de",
        "pavé de",
        "pincées de",
        "litre de",
        "gramme de",
        "kilogramme de",
        "millilitre de",
        "centilitre de",
        "décilitre de",
        "cup",
        "1/2 cup",
        "1/3 cup",
        "1/4 cup",
        "tablespoon",
        "teaspoon",
        "tbsp",
        "tsp",
        "fluid ounce",
        "fl oz",
        "ounce",
        "oz",
        "pound",
        "lb",
        "once",
        "livre",
        "doigt de",
        "fagot de",
        "éclat de",
        "pavé de",
        "portion de",
        "part de",
        "parts de",
        "toast de",
        "tartine de",
        "rouelle de",
        "escalope de",
        "pavé de",
        "darne de",
        "tronçon de",
        "pavé de",
        "côte de",
        "côtes de",
        "entier",
        "entière",
        "demi",
        "moitié de",
        "quart de",
        "tiers de",
        "à volonté",
        "selon goût",
        "à convenance",
        "un peu de",
        "beaucoup de",
        "suffisamment de"
        ];

    return (
        <div>
            <div className={styles.search}>
                { isSelect === "" ?
                    <>
                        <input
                            onChange={(e) => {
                                setInput(e.target.value);
                                setContents(SearchInList(e.target.value, uniteList))
                            }}
                            value={input}
                            type="text"
                            placeholder="Rechercher une unité..."
                            className={styles.input}
                        />
                        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/>
                    </>
                    :
                    <>
                        <p className={styles.input}>{isSelect}</p>
                        <FontAwesomeIcon style={{cursor: "pointer"}} onClick={() => {setIsSelect(""); setInput("")}} className={styles.icon} icon={faXmark}/>
                    </>
                    }
            </div>
            <div className={styles.list}>
                { contents.map((content) => <button onClick={() => {setContents([]); setIsSelect(content); onChange(content)}} className={styles.item}>{content}</button>)}
            </div>
        </div>
    )
}