import Popup from "reactjs-popup"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../../reducers/token";
import { useRouter } from "next/router";
import styles from "../../styles/authentification/Signin.module.css"

function Signin() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const signin = async () => {
        if (password === confirm)
        {
            const signinResult = await ( await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password})
            })).json()

            alert(signinResult)

            if (signinResult.error === undefined)
            {
                setErrorMsg("");
                dispatch(login(signinResult.token));
                router.push("/");
            }
            else
            {
                setErrorMsg(signinResult.error);
            }
        }
        else
        {
            setErrorMsg("Les mots de passe ne correspondent pas.")
        }
    }

    return (
        <Popup
        trigger={<button className={styles.connect}> S'inscrire </button>}
        modal
        nested
        closeOnDocumentClick={false}
        closeOnEscape={false}
        >
            {close => (
                <div className={styles.body}>
                    <div className={styles.head}>
                        <h3 className={styles.titre}>
                            S'inscrire
                        </h3>
                        <button onClick={close} className={styles.close}>
                            &times;
                        </button>
                    </div>
                    
                    <div className={styles.container}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="mail" placeholder="Entrez votre email" className={styles.input}/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Entrez votre mot de passe" className={styles.input}/>
                        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirmez votre mot de passe" className={styles.input}/>
                        <button onClick={() => signin()} className={styles.bouton}>S'inscrire</button>
                        <p className={styles.error}>{errorMsg}</p>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default Signin