import { Link } from 'react-router-dom';
import styles from '../styles/Home.Module.css';

const Home = () => {
  const items = ['Hotspots', 'Scan', 'Map', 'Profile'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Crowdy</p>
      </div>
      <div className={styles.content}>
        <ul className={styles.nav}>
          {items.map(item => (
            <li className={styles.nav__item} key={item}>
              <Link to={`/${item.toLowerCase()}`}>
                <div className={styles[`${item.toLowerCase()}__icon`]} />
                <p className={styles.nav__item__txt}>{item}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.btn__download}>
          <p className={styles.btn__download__txt}>Download the shortcut</p>
        </div>
      </div>
    </div>
  );
}
 
export default Home;