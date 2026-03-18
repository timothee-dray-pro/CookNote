import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/utile/Select.module.css'

function isInList (el, list)
{
    let result = false;
    for (let element of list)
    {
        if (el === element)
        {
            result = true;
        }
    }
    return result;
}

export default function Select({ children, text, type, onChange }) {
    if (type === "checkbox")
    {
        const [open, setOpen] = useState(false)
        const [indexHover, setIndexHover] = useState(-1)
        const [indexClick, setIndexClick] = useState([])
        const bodyRef = useRef(null)

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (open && bodyRef.current && !bodyRef.current.contains(event.target)) {
                    setOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [open])

        const champs = children;

        const listeChamp = [];

        for (let champ of children)
        {
            listeChamp.push({champ: champ, click: false, hover:false})
        };

        const style = {
            cursor: "pointer",
            paddingTop: "clamp(4px, 0.6vw, 6px)",
            paddingBottom: "clamp(4px, 0.6vw, 6px)",
            paddingLeft: "clamp(10px, 1vw, 15px)",
            paddingRight: "clamp(10px, 1vw, 15px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1vw, 10px)",
        };

        const hover = {
            cursor: "pointer",
            paddingTop: "clamp(4px, 0.6vw, 6px)",
            paddingBottom: "clamp(4px, 0.6vw, 6px)",
            paddingLeft: "clamp(10px, 1vw, 15px)",
            paddingRight: "clamp(10px, 1vw, 15px)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 1vw, 10px)",
            backgroundColor: "#fcf2ed",
        };

        const checkbox = {
            border: "1px solid black",
            borderRadius: "3px",
            width: "12px",
            height: "12px",
            minWidth: "12px",
            minHeight: "12px",
            flexShrink: 0,
        };

        const checkboxClick = {
            border: "1px solid #ff6a00",
            borderRadius: "3px",
            width: "12px",
            height: "12px",
            minWidth: "12px",
            minHeight: "12px",
            backgroundColor: "#ff6a00",
            color: "white",
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            paddingLeft: "1px",
            flexShrink: 0,
        };

        const handleClick = (key) => {
            let newIndexClick;

            if (isInList(key, indexClick)) {
                newIndexClick = indexClick.filter((el) => el !== key);
            } else {
                newIndexClick = [...indexClick, key];
            }

            setIndexClick(newIndexClick);

            const newValues = newIndexClick.map((index) => listeChamp[index].champ.props.value);
            onChange(newValues);
        }

        return(
            <div ref={bodyRef} className={styles.body}>
                <button className={open ? styles.boutonOpen : styles.boutonClose} onClick={() => setOpen(!open)}>
                    <span>{text}</span>
                    {
                        open ? <span className={styles.flecheOpen}>▾</span> : <span className={styles.flecheClose}>▾</span>
                    }
                </button>
                
                <div className={open ? styles.listeOpen : styles.listeClose}>
                    {
                        listeChamp.map((champs, key) =>
                            <div
                                key={key}
                                style={indexHover === key || isInList(key, indexClick) ? hover : style}
                                onMouseEnter={() => setIndexHover(key)}
                                onMouseLeave={() => setIndexHover(-1)}
                                onClick={() => handleClick(key)}
                            >
                                <div style={isInList(key, indexClick) ? checkboxClick : checkbox}>{isInList(key, indexClick) ? "✓" : ""}</div><div> {champs.champ}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
    else
    {
        const [open, setOpen] = useState(false)
        const [indexHover, setIndexHover] = useState(-1)
        const [itemClick, setItemClick] = useState(0)
        const bodyRef = useRef(null)

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (open && bodyRef.current && !bodyRef.current.contains(event.target)) {
                    setOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)

            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [open])

        const champs = children;

        const listeChamp = [];

        for (let champ of children)
        {
            listeChamp.push({champ: champ, click: false, hover:false})
        };

        const style = {
            cursor: "pointer",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingLeft: "15px",
            paddingRight: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
        };

        const hover = {
            cursor: "pointer",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingLeft: "15px",
            paddingRight: "15px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#fcf2ed",
        };

        return(
            <div ref={bodyRef} className={styles.body}>
                <button className={open ? styles.boutonOpen : styles.boutonClose} onClick={() => setOpen(!open)}>
                    <span>{listeChamp[itemClick].champ}</span>
                    {
                        open ? <span className={styles.flecheOpen}>▾</span> : <span className={styles.flecheClose}>▾</span>
                    }
                </button>
                
                <div className={open ? styles.listeOpen : styles.listeClose}>
                    {
                        listeChamp.map((champs, key) =>
                            <div
                                style={indexHover === key ? hover : style}
                                onMouseEnter={() => setIndexHover(key)}
                                onMouseLeave={() => setIndexHover(-1)}
                                onClick={() => {
                                    setItemClick(key);
                                    setOpen(false);
                                    onChange(champs.champ.props.value);
                                }}
                            >
                                {champs.champ}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}