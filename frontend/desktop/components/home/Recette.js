import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark as faBookmarkSolid, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';

import styles from '../../styles/home/Recette.module.css';

function Recette(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const icon = isFavorite ? faBookmarkSolid : faBookmarkRegular;

    const Favorite = async (value) => {
        setIsFavorite(value);
        let result = [];
        if (value)
        {
            props.onChange([...props.value, props.id]);
        }
        else
        {
            for (let id of props.value)
            {
                if (id !== props.id)
                {
                    result.push(id);
                }
            }
            props.onChange(result);
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recette/update_favorite`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                token: props.token,
            },
            body: JSON.stringify({id: props.id})
        });

        const data = await response.json();
        if (data.result === false)
        {
            alert("Erreur serveur")
        }
    }

    const Delete = async () => {
        await Favorite(false);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recette/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: props.token,
            },
            body: JSON.stringify({id: props.id})
        });

        const data = await response.json();
        if (data.result === false)
        {
            alert("Erreur serveur")
        }
        else
        {
            let temp = [];
            for (let recette of props.recettes)
            {
                if (recette._id !== props.id)
                {
                    temp.push(recette);
                }
            }
            props.setRecettes(temp);

            temp = [];
            for (let recette of props.newRecettes)
            {
                if (recette._id !== props.id)
                {
                    temp.push(recette);
                }
            }
            props.setNewRecettes(temp);

            temp = [];
            for (let recette of props.newRecettesTags)
            {
                if (recette._id !== props.id)
                {
                    temp.push(recette);
                }
            }
            props.setNewRecettesTags(temp);
        }
    }

    useEffect(() => {
        if (props.value.includes(props.id)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [props.token, props.value]);

    return (
        <div className={styles.body}>
            <Link style={{cursor:"pointer"}} href={"recette?id=" + props.id}>
                <a>
                    <Image width={500} height={310} className={styles.bg} src={props.src} alt={props.title + " image"}/>
                </a>
            </Link>
            <div className={styles.description}>
                <h3 className={styles.titre}>
                    {props.title}
                </h3>
                <div className={styles.icon_right}>
                    <div onClick={() => Delete()} className={styles.delete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                    <div onClick={() => Favorite(!isFavorite)} style={isFavorite ? {color: "#face16", cursor:"pointer"} : {cursor: "pointer"}}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Recette;
