import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Confirm.Module.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Confirm = () => {
  let { id, report } = useParams();
  const ratings = ['Quiet', 'Comfortable', 'Crowded'];
  const [userData, setUserData] = useState(false);

  // Checking if the user is logged in. If so, retrieve the data
  if (localStorage.getItem('userdata') !== null && localStorage.getItem('userdata') !== undefined && !userData) {
    setUserData(JSON.parse(localStorage.getItem('userdata')));
  }

  return (
    <section className={styles.container}>
      <Navbar title="Crowdedness" />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.confetti__top} />
          <p className={styles.header__text}>Thank you{userData ? ` ${userData.firstname}` : ``}!</p>
          <div className={styles.confetti__bottom} />
        </div>
        <Link to="/profile">
          <p className={styles.btn__home}>Back Home</p>
        </Link>
        <p className={styles.details}>You voted that {id} is {ratings[parseInt(report) - 1].toLowerCase()}.</p>
      </div>
    </section>
  );
}
 
export default Confirm;