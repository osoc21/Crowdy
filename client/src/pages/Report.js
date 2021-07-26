import Navbar from '../components/Navbar';
import styles from '../styles/Report.Module.css';
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from 'react';

const Report = ({ hotspots }) => {
  const [rating, setRating] = useState(null);
  let { slug } = useParams();
  const hotspot = hotspots[slug];

  const ratings = ['quiet', 'comfortable', 'crowded']

  const handleClickRating = e => {
    // Add report/rating to the database
    setRating(e.currentTarget.value);
  };

  if (rating !== null) {
    return <Redirect to="/reward" push />
  }

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
          <form className={styles.ratings} method="post">
            {ratings.map((rating, index) => (
              <div className={styles.rating} key={index}>
                <input className={styles.rating__input} type="radio" name="rating" id={rating} value={index + 1} onChange={handleClickRating} />
                <label className={styles.rating__label} htmlFor={rating}>[{rating}]</label>
              </div>
            ))}
          </form>
        </div>
        <Link className={styles.about} to="/about">
          <p className={styles.btn__tertiary}>What is Crowdy?</p>
        </Link>
      </div>
    </section>
  );
}
 
export default Report;