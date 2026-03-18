import styles from "../../styles/utile/TitleBar.module.css"

export default function TitleBar ({ children }) {
    return(
        <div className={styles.title}>
            <div className={styles.leftBorder}></div>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.rightBorder}></div>
        </div>
    );
}