import Navbar from '../components/Navbar';
import styles from '../styles/Report.Module.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Report = ({ hotspots }) => {
  let { slug } = useParams();
  const hotspot = hotspots[slug];

  const ratings = ['quiet', 'comfortable', 'crowded']

  return (
    <section className={styles.container}>
      <Navbar previous="/scan" title="Crowdedness" />
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.hotspot}>{hotspot.name}</p>
          <p className={styles.question}>How crowded is it here?</p>
        </div>
        <div className={styles.rating__container}>
          <div className={styles.rating__header}>
            <p className={styles.rating__header__item}>Quiet</p>
            <p className={styles.rating__header__item}>Crowded</p>
          </div>
          <div className={styles.ratings}>
            {ratings.map((rating, index) => <p className={styles.rating} key={index}>[{rating}]</p>)}
          </div>
        </div>
        <Link className={styles.about__link} to="/about">
          <p className={styles.about}>What is Crowdy?</p>
        </Link>
      </div>
    </section>
  );
}
 
export default Report;