import Navbar from '../components/Navbar';
import styles from '../styles/Report.Module.css';
import { useParams } from "react-router-dom";

const Report = () => {
  let { slug } = useParams();

  const ratings = ['abandoned', 'quiet', 'comfortable', 'crowded', 'very crowded']

  return (
    <section className={styles.container}>
      <Navbar previous="/scan" title="Report" />
      <div className={styles.content}>
        <p className={styles.hotspot}>{slug}</p>
        <p className={styles.question}>How crowded is it here?</p>
        <div className={styles.rating__container}>
          <div className={styles.rating__header}>
            <p className={styles.rating__header__item}>Quiet</p>
            <p className={styles.rating__header__item}>Crowded</p>
          </div>
          <div className={styles.ratings}>
            {ratings.map((rating, index) => <p className={styles.rating} key={index}>[{rating}]</p>)}
          </div>
        </div>
        <p className={styles.about}>What is Crowdy?</p>
      </div>
    </section>
  );
}
 
export default Report;