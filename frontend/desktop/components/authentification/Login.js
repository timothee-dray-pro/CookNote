import Popup from "reactjs-popup"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../../reducers/token";
import { useRouter } from "next/router";
import styles from "../../styles/authentification/Login.module.css"

function Login() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginFunction = async () => {
        console.log("fonction")
        const loginResult = await ( await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password})
        })).json();

        if (loginResult.error === undefined)
        {
            setErrorMsg("");
            dispatch(login(loginResult.token));
            router.push("/");
        }
        else
        {
            setErrorMsg(loginResult.error);
        }

    }

  return (
    <Popup
    trigger={<button className={styles.connect}> Se connecter </button>}
    modal
    nested
    closeOnDocumentClick={false}
    closeOnEscape={false}
    >
        {close => (
            <div className={styles.body}>
                <div className={styles.head}>
                    <h3 className={styles.titre}>
                        Se connecter
                    </h3>
                    <button onClick={close} className={styles.close}>
                        &times;
                    </button>
                </div>
                
                <div className={styles.container}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="mail" placeholder="Entrez votre email" className={styles.input}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Entrez votre mot de passe" className={styles.input}/>
                    <button onClick={() => loginFunction()} className={styles.bouton}>Se connecter</button>
                    <p className={styles.error}>{errorMsg}</p>
                </div>
            </div>
        )}
    </Popup>
  )
}

export default Login