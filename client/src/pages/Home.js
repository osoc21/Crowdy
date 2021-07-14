import { Link } from 'react-router-dom';
import styles from '../styles/Home.Module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Crowdy</p>
        <p className={styles.subtitle}>Find the calmest spots in Ghent</p>
      </div>
      <ul className={styles.nav}>
        <li className={styles.nav__item}>
          <Link to="/hotspots">
            <p className={styles.nav__item__txt}>Hotspots</p>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/scan">
            <p className={styles.nav__item__txt}>Scan</p>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/map">
            <p className={styles.nav__item__txt}>Map</p>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link to="/profile">
            <p className={styles.nav__item__txt}>Profile</p>
          </Link>
          {/*!account ? (
            <Link to="/login">
              <p className={styles.nav__item__txt}>Sign in</p>
            </Link>
          ) : (
            <Link to="/profile">
              <p className={styles.nav__item__txt}>Profile</p>
            </Link>
          )*/}
        </li>
      </ul>
      <Link to="/about">About this app</Link>
    </div>
  );
}
 
export default Home;