import styles from '../../styles/authentification/Acceuil.module.css';
import Login from './Login';
import Signin from './Signin';
import Image from 'next/image';

function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.titre_contains}>
        <Image src="/favicon.ico" alt="logo" width={120} height={120}/>
        <h1 className={styles.titre}>
          CookNote
        </h1>
      </div>
      
      <div className={styles.boutons}>
        <Login />
        <Signin />
      </div>
    </div>
  );
}

export default Home;
