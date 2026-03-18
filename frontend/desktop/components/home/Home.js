import Select from '../utile/Select';
import Recette from './Recette';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons"
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../reducers/token";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/home/Home.module.css';

function SearchInList(el, list) {
    if (el.length === 0) {
        return [];
    }

    return list.filter((element) =>
        element.title.toLowerCase().startsWith(el.toLowerCase())
    );
}

function FilterByTags(tags, recettes) {
    return recettes.filter((recette) => {
        return Array.isArray(recette.tags) && tags.every((tag) => recette.tags.includes(tag));
    });
}

function Acceuil() {
    const dispatch = useDispatch();

    const router = useRouter();
    const token = useSelector((state) => state.token.token);
    const [search, setSearch] = useState("");
    const [recettes, setRecettes] = useState([]);
    const [newRecettes, setNewRecettes] = useState([]);
    const [newRecettesTags, setNewRecettesTags] = useState([]);
    const [tagsSelect, setTagsSelect] = useState([]);
    const [listeFavorite, setListeFavorite] = useState([]);
    const [displayFavorite, setDisplayFavorite] = useState(false);
    const icon = displayFavorite ? faBookmarkSolid : faBookmarkRegular;

    const Favorite = (value) => {
        setDisplayFavorite(value);
    }

    const Search = (value) => {
        setSearch(value);
        setListeFavorite([...listeFavorite, null]);
        setListeFavorite(prev => prev.slice(0, -1));

        if (value === "") {
            setNewRecettes([]);

            if (tagsSelect.length > 0) {
                setNewRecettesTags(FilterByTags(tagsSelect, recettes));
            }
        } else {
            const recettesSearch = SearchInList(value, recettes);
            setNewRecettes(recettesSearch);

            if (tagsSelect.length > 0) {
                setNewRecettesTags(FilterByTags(tagsSelect, recettesSearch));
            }
        }
    }

    const Tags = (tags) => {
        setTagsSelect(tags);
        setListeFavorite([...listeFavorite, null]);
        setListeFavorite(prev => prev.slice(0, -1));

        if (tags.length > 0)
        {
            if (search === "")
            {
                const result = FilterByTags(tags, recettes);
                setNewRecettesTags(result);
            }
            else
            {
                setNewRecettesTags(FilterByTags(tags, newRecettes));
            }
            
            if (tags.length === 0)
            {
                setNewRecettesTags([])
            }
        }
    }

    const HandleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("persist:token");
    }
    
    useEffect(() => {
        if (token === null)
        {
            router.push("/authentification");
        }
        else
        {
            setSearch("");
            setTagsSelect([]);
            setNewRecettes([]);
            setNewRecettesTags([]);
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/recette/get`, {
                headers: {
                    token: token
                },
                method: "GET",
            })
            .then(response => response.json())
            .then(data => {
                setRecettes(data.recette);
                let temp = [];
                for (let recette of data.recette)
                {
                    if (recette.favorite)
                    {
                        temp.push(recette._id)
                    }
                }
                setListeFavorite(temp);
            })
        };
    }, [token, router]);

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1 className={styles.titre}>Qu'est-ce que l'on va manger ?</h1>
                <div className={styles.right}>
                    <div onClick={() => Favorite(!displayFavorite)} style={displayFavorite ? {color: "#face16", cursor:"pointer", fontSize:"2em"} : {cursor: "pointer", fontSize:"2em"}}>
                        <FontAwesomeIcon icon={icon}/>
                    </div>

                    <Select type="checkbox" text="-- Filtrer --" onChange={Tags}>
                        <option value="entree">Entrée</option>
                        <option value="plat">Plat</option>
                        <option value="dessert">Dessert</option>
                        <option value="viande">Viande</option>
                        <option value="poisson">Poisson</option>
                    </Select>

                    <button className={styles.logout} onClick={() => HandleLogout()}>Se déconnecter</button>
                </div>
            </div>

            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Rechercher une recette..."
                    className={styles.input}
                    value={search}
                    onChange={(e) => Search(e.target.value)}
                />
                <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/>
            </div>
            
            <div className={styles.recettes}>
                {
                    displayFavorite ?
                        tagsSelect.length > 0 ?
                            newRecettesTags.map((recette) =>
                                listeFavorite.includes(recette._id) ?
                                    <Recette
                                        value={listeFavorite}
                                        onChange={setListeFavorite}
                                        tags={recette.tags}
                                        token={token}
                                        title={recette.title}
                                        src={recette.img}
                                        id={recette._id}
                                        setRecettes={setRecettes}
                                        setNewRecettes={setNewRecettes}
                                        setNewRecettesTags={setNewRecettesTags}
                                        recettes={recettes}
                                        newRecettes={newRecettes}
                                        newRecettesTags={newRecettesTags}
                                    /> 
                                : null)
                        :
                            search === "" ?
                                recettes.map((recette) =>
                                    listeFavorite.includes(recette._id) ?
                                        <Recette
                                            value={listeFavorite}
                                            onChange={setListeFavorite}
                                            tags={recette.tags}
                                            token={token}
                                            title={recette.title}
                                            src={recette.img}
                                            id={recette._id}
                                            setRecettes={setRecettes}
                                            setNewRecettes={setNewRecettes}
                                            setNewRecettesTags={setNewRecettesTags}
                                            recettes={recettes}
                                            newRecettes={newRecettes}
                                            newRecettesTags={newRecettesTags}
                                        />
                                    : null)
                            :
                                newRecettes.map((recette) =>
                                    listeFavorite.includes(recette._id) ?
                                        <Recette
                                            value={listeFavorite}
                                            onChange={setListeFavorite}
                                            tags={recette.tags}
                                            token={token}
                                            title={recette.title}
                                            src={recette.img}
                                            id={recette._id}
                                            setRecettes={setRecettes}
                                            setNewRecettes={setNewRecettes}
                                            setNewRecettesTags={setNewRecettesTags}
                                            recettes={recettes}
                                            newRecettes={newRecettes}
                                            newRecettesTags={newRecettesTags}
                                        />
                                    : null)
                    :
                        tagsSelect.length > 0 ?
                            newRecettesTags.map((recette) =>
                                <Recette
                                    value={listeFavorite}
                                    onChange={setListeFavorite}
                                    tags={recette.tags}
                                    token={token}
                                    title={recette.title}
                                    src={recette.img}
                                    id={recette._id}
                                    setRecettes={setRecettes}
                                    setNewRecettes={setNewRecettes}
                                    setNewRecettesTags={setNewRecettesTags}
                                    recettes={recettes}
                                    newRecettes={newRecettes}
                                    newRecettesTags={newRecettesTags}
                                />
                            )
                        :
                            search === "" ?
                                recettes.map((recette) =>
                                    <Recette
                                        value={listeFavorite}
                                        onChange={setListeFavorite}
                                        tags={recette.tags}
                                        token={token}
                                        title={recette.title}
                                        src={recette.img}
                                        id={recette._id}
                                        setRecettes={setRecettes}
                                        setNewRecettes={setNewRecettes}
                                        setNewRecettesTags={setNewRecettesTags}
                                        recettes={recettes}
                                        newRecettes={newRecettes}
                                        newRecettesTags={newRecettesTags}
                                    />
                                )
                            :
                                newRecettes.map((recette) =>
                                    <Recette
                                        value={listeFavorite}
                                        onChange={setListeFavorite}
                                        tags={recette.tags}
                                        token={token}
                                        title={recette.title}
                                        src={recette.img}
                                        id={recette._id}
                                        setRecettes={setRecettes}
                                        setNewRecettes={setNewRecettes}
                                        setNewRecettesTags={setNewRecettesTags}
                                        recettes={recettes}
                                        newRecettes={newRecettes}
                                        newRecettesTags={newRecettesTags}
                                    />
                                )
                }
            </div>

            <Link href="ajouter_une_recette">
                <a className={styles.new_recette}>+ Ajouter une recette</a>
            </Link>
        </div>
    );
}

export default Acceuil;