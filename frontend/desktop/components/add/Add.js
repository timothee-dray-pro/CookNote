import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faBars, faTrash } from "@fortawesome/free-solid-svg-icons";
import SortableItem from '../utile/SortableItem';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import Select from '../utile/Select'
import Search from '../utile/Search'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import styles from "../../styles/add/Add.module.css";

export default function Add()
{
    const token = useSelector((state) => state.token.token);
    const router = useRouter();

    const [openModal, setOpenModal] = useState("");

    const [quantityAdd, setQuantityAdd] = useState(0);
    const [unieAdd, setUniteAdd] = useState("");
    const [elAdd, setElAdd] = useState("");

    const [ingredients, setIngredients] = useState([]);

    const [etapesText, setEtapesText] = useState("");
    const [etapes, setEtapes] = useState([]);

    const [dressageText, setDressageText] = useState("");
    const [dressages, setDressages] = useState([]);

    const [overIngredientId, setOverIngredientId] = useState(null);
    const [overEtapeId, setOverEtapeId] = useState(null);
    const [overDressageId, setOverDressageId] = useState(null);
    const [preview, setPreview] = useState("");

    const [titre, setTitre] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [tempsPreparation, setTempsPreparation] = useState("");
    const [tempsCuisson, setTempsCuisson] = useState("");
    const [difficulte, setDifficulte] = useState("");
    const [tags, setTags] = useState([]);
    const [notes, setNotes] = useState("");

    const isModalOpen = openModal !== "";

    const handleDragEndIngredients = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setOverIngredientId(null);
            return;
        }

        setIngredients((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
        });

        setOverIngredientId(null);
    };

    const handleDragEndEtapes = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setOverEtapeId(null);
            return;
        }

        setEtapes((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
        });

        setOverEtapeId(null);
    };

    const handleDragEndDressages = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setOverDressageId(null);
            return;
        }

        setDressages((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            return arrayMove(items, oldIndex, newIndex);
        });

        setOverDressageId(null);
    };

    const deleteIngredient = (id) => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    };

    const deleteEtape = (id) => {
        setEtapes(etapes.filter((etape) => etape.id !== id));
    };

    const deleteDressage = (id) => {
        setDressages(dressages.filter((dressage) => dressage.id !== id));
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    useEffect(() => {
        if (token === null) {
            router.push("/authentification");
        }
    }, [token, router]);

    const save = async () => {
        try
        {
            const formData = new FormData();

            formData.append("img", image);
            formData.append("title", titre);
            formData.append("description", description);
            formData.append("temps_de_preparation", tempsPreparation);
            formData.append("temps_de_cuisson", tempsCuisson);
            formData.append("difficulte", difficulte);
            formData.append("tags", JSON.stringify(tags));
            formData.append("ingredients", JSON.stringify(ingredients));
            formData.append("etapes", JSON.stringify(etapes));
            formData.append("dressages", JSON.stringify(dressages));
            formData.append("notes", notes);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recette/add`, {
                method: "POST",
                headers: {
                    token: token
                },
                body: formData,
            });

            const result = await response.json();

            if (result.result)
            {
                router.push("/");
            }
            else
            {
                alert(result.error);
            }

        }
        catch (error)
        {
            alert("Erreur serveur");
        }
    };
    
    return(
        <div>
            {
                openModal === "ingredient" ? 
                    <div className={styles.addIngrOpen}>
                        <h3>Ajouter un ingrédient</h3>
                        <div className={styles.fieldAdd}>
                            <p className={styles.addTitre}>Quantité ?</p>
                            <input onChange={(e) => setQuantityAdd(e.target.value)} type="number" className={styles.addInput}/>
                        </div>
                        <Search onChange={setUniteAdd}/>
                        <div className={styles.fieldAdd}>
                            <p className={styles.addTitre}>Produit ?</p>
                            <input onChange={(e) => setElAdd(e.target.value)} type="text" className={styles.addInput}/>
                        </div>

                        <div className={styles.fieldAdd}>
                            <button className={styles.annulerBouton} onClick={() => setOpenModal("")}>Annuler</button>
                            <button
                                className={styles.saveBouton}
                                onClick={() => {
                                    setIngredients([...ingredients, {
                                        id: `ing-${ingredients.length + 1}`, quantity: quantityAdd, el: elAdd, unite: unieAdd
                                    }]);
                                    setOpenModal("");
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                : openModal === "etape" ? 
                    <div className={styles.addText}>
                        <h3>Ajouter une étapes</h3>
                        <textarea placeholder="Décris l’action à réaliser... " onChange={(e) => setEtapesText(e.target.value)}></textarea>
                        
                        <div className={styles.fieldAdd}>
                            <button className={styles.annulerBouton} onClick={() => setOpenModal("")}>Annuler</button>
                            <button
                                className={styles.saveBouton}
                                onClick={() => {
                                    setEtapes([...etapes, {
                                        id: `etape-${etapes.length + 1}`, text: etapesText
                                    }]);
                                    setOpenModal("");
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>

                : openModal === "dressage" ?
                    <div className={styles.addText}>
                        <h3>Ajouter une étapes de dréssage</h3>
                        <textarea placeholder="Décris l’action à réaliser... " onChange={(e) => setDressageText(e.target.value)}></textarea>
                        
                        <div className={styles.fieldAdd}>
                            <button className={styles.annulerBouton} onClick={() => setOpenModal("")}>Annuler</button>
                            <button
                                className={styles.saveBouton}
                                onClick={() => {
                                    setDressages([...dressages, {
                                        id: `dressage-${dressages.length + 1}`, text: dressageText
                                    }]);
                                    setOpenModal("");
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                : null
            }

            <header className={styles.header}>
                <div className={styles.leftHeader}>
                    <Image src="/favicon.ico" alt="logo" width={60} height={60}/>
                    <h1>
                        CookNote
                    </h1>
                    <h1>
                        -
                    </h1>
                    <h1>
                        { titre === "" ? "Ajouter une recette" : titre }
                    </h1>
                </div>
                <div className={styles.rightHeader}>
                    <Link href='/'>
                        <a className={styles.annulerBouton}>Annuler</a>
                    </Link>
                    <button onClick={() => save()} className={styles.saveBouton}>Enregistrer</button>
                </div>
            </header>

            <div className={styles.body}>
                <div className={styles.entete}>
                    <input type="file" id="file" accept="image/*" onChange={handleChange} hidden />
                    {
                        preview === "" ? (
                            <label htmlFor="file" className={styles.input}>
                                <FontAwesomeIcon icon={faCamera} style={{fontSize: "4em", marginTop:"9vh"}}/>
                                <p>Ajouter une photo</p>
                            </label>
                        ) : (
                            <label htmlFor="file" className={styles.img}><Image className={styles.img} src={preview} alt="aperçu" width={600} height={378}/></label>
                        )
                    }
                    
                    <div className={styles.leftEntente}>
                        <input
                            type="text"
                            name="titre de la recette à saisir par l'utilisateur"
                            placeholder='Ajouter un titre'
                            className={styles.inputTitre}
                            onChange={(e) => setTitre(e.target.value)} value={titre}
                        />

                        <textarea
                            type="text"
                            name="description de la recette à saisir par l'utilisateur"
                            placeholder='Description...'
                            className={styles.inputDescription}
                            onChange={(e) => setDescription(e.target.value)} value={description}
                        />
                    </div>
                </div>

                <div className={styles.infosRecette}>
                    <div className={styles.field}>
                        <p>Temps de préparation</p>
                        <input type="number" name="temps de préparation" placeholder="Ex: 15 min" onChange={(e) => setTempsPreparation(e.target.value)} value={tempsPreparation}/>
                    </div>
                    <div className={styles.field}>
                        <p>Temps de cuisson</p>
                        <input type="number" name="temps de cuisson" placeholder="Ex: 30 min" onChange={(e) => setTempsCuisson(e.target.value)} value={tempsCuisson}/>
                    </div>
                    <div className={styles.field}>
                        <p>Difficulté</p>
                        <Select onChange={setDifficulte}>
                            <option value="">-- Sélectionner --</option>
                            <option value="facile">Facile</option>
                            <option value="moyen">Moyen</option>
                            <option value="difficile">Difficile</option>
                        </Select>
                    </div>
                    <div className={styles.field}>
                        <p>Tags</p>
                        <Select onChange={setTags} text="-- Tags --" type="checkbox">
                            <option value="entree">Entrée</option>
                            <option value="plat">Plat</option>
                            <option value="dessert">Dessert</option>
                            <option value="viande">Viande</option>
                            <option value="poisson">Poisson</option>
                        </Select>
                    </div>
                </div>

                <div className={styles.contents}>
                    <div className={styles.content}>
                        <h5 className={styles.titre}>
                            Ingrédients
                        </h5>
                        <button onClick={() => setOpenModal("ingredient")} disabled={isModalOpen}>+ Ajouter un ingrédient</button>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEndIngredients}
                            onDragCancel={() => setOverIngredientId(null)}
                            onDragOver={(event) => {
                                setOverIngredientId(event.over ? event.over.id : null);
                            }}
                        >
                            <SortableContext
                                items={ingredients.map((ingredient) => ingredient.id)}
                                strategy={horizontalListSortingStrategy}
                            >
                                <div className={styles.listeChamp}>
                                    {ingredients.map((ingredient, index) => (
                                        <SortableItem
                                            key={ingredient.id}
                                            id={ingredient.id}
                                            isTarget={overIngredientId === ingredient.id}
                                        >
                                            {({ attributes, listeners, contentStyle }) => (
                                                <div className={styles.champ} style={contentStyle}>
                                                    <span>{index + 1}</span>
                                                    <p>{ingredient.quantity} {ingredient.unite} {ingredient.el}</p>
                                                    <div className={styles.rightIcons}>
                                                        <div
                                                            className={styles.deleteIcon}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteIngredient(ingredient.id);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </div>
                                                        <div className={styles.dragHandle} {...attributes} {...listeners}>
                                                            <FontAwesomeIcon icon={faBars}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className={styles.content}>
                        <h5 className={styles.titre}>
                            Étapes
                        </h5>
                        <button onClick={() => setOpenModal("etape")} disabled={isModalOpen}>+ Ajouter une étape</button>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEndEtapes}
                            onDragCancel={() => setOverEtapeId(null)}
                            onDragOver={(event) => {
                                setOverEtapeId(event.over ? event.over.id : null);
                            }}
                        >
                            <SortableContext
                                items={etapes.map((etape) => etape.id)}
                                strategy={horizontalListSortingStrategy}
                            >
                                <div className={styles.listeChamp}>
                                    {etapes.map((etape, index) => (
                                        <SortableItem
                                            key={etape.id}
                                            id={etape.id}
                                            isTarget={overEtapeId === etape.id}
                                        >
                                            {({ attributes, listeners, contentStyle }) => (
                                                <div className={styles.champ} style={contentStyle}>
                                                    <span>{index + 1}</span>
                                                    <p style={{cursor:"pointer"}} onClick={() => Swal.fire({title: `Étape ${index+1}`, text:etape.text, confirmButtonColor: "#ff6a00", color:"#000"})}>{etape.text}</p>
                                                    <div className={styles.rightIcons}>
                                                        <div
                                                            className={styles.deleteIcon}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteEtape(etape.id);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </div>
                                                        <div className={styles.dragHandle} {...attributes} {...listeners}>
                                                            <FontAwesomeIcon icon={faBars}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className={styles.content}>
                        <h5 className={styles.titre}>
                            Dressage
                        </h5>
                        <button onClick={() => setOpenModal("dressage")} disabled={isModalOpen}>+ Ajouter une astuce de dréssage</button>
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEndDressages}
                            onDragCancel={() => setOverDressageId(null)}
                            onDragOver={(event) => {
                                setOverDressageId(event.over ? event.over.id : null);
                            }}
                        >
                            <SortableContext
                                items={dressages.map((dressage) => dressage.id)}
                                strategy={horizontalListSortingStrategy}
                            >
                                <div className={styles.listeChamp}>
                                    {dressages.map((dressage, index) => (
                                        <SortableItem
                                            key={dressage.id}
                                            id={dressage.id}
                                            isTarget={overDressageId === dressage.id}
                                        >
                                            {({ attributes, listeners, contentStyle }) => (
                                                <div className={styles.champ} style={contentStyle}>
                                                    <span>{index + 1}</span>
                                                    <p style={{cursor:"pointer"}} onClick={() => Swal.fire({title: `Dressage ${index+1}`, text:dressage.text, confirmButtonColor: "#ff6a00", color:"#000"})}>{dressage.text}</p>
                                                    <div className={styles.rightIcons}>
                                                        <div
                                                            className={styles.deleteIcon}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteDressage(dressage.id);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </div>
                                                        <div className={styles.dragHandle} {...attributes} {...listeners}>
                                                            <FontAwesomeIcon icon={faBars}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </SortableItem>
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>

                <div className={styles.notes}>
                    <h5 className={styles.titre}>
                        Notes personnelles <span style={{color:"#969293", fontStyle:"italic", fontSize:"18px"}}>(optionnel)</span>
                    </h5>
                    <textarea type="text" name="notes personnelles" placeholder="Ajouter vos notes ici..." onChange={(e) => setNotes(e.target.value)} value={notes}/>
                </div>
            </div>
        </div>
    );
}