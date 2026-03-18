import { useState } from 'react';
import styles from "../../styles/utile/NumberButton.module.css"

function NumberButton ({ onChange }) {
    const [nb, setNb] = useState(1)

    const updateNb = (newNb) => {
        setNb(newNb);
        onChange(newNb);
    }

    return(
        <div className={styles.body}>
            <button
                className={styles.bouton}
                onClick={() => {
                    if (nb > 1) {
                        updateNb(nb - 1);
                    };
                }}
            >
                -
            </button>

            <p className={styles.p}>{nb}</p>

            <button
                className={styles.bouton}
                onClick={() => updateNb(nb + 1)}
            >
                +
            </button>
        </div>
    );
}

export default NumberButton;