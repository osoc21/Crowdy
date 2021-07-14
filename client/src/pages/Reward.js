import Navbar from '../components/Navbar';
import styles from '../styles/Reward.Module.css';

const Reward = ({ loggedIn }) => {
  const xp = 30;

  return (
    <section className={styles.container}>
      <Navbar previous="" title="Reward" />
      {loggedIn ? (
        <div className={styles.content}>
          <p className={styles.name}>Pieter</p>
          <p className={styles.rank}>The Ranger</p>
          <div className={styles.profile__picture}></div>
          <div className={styles.progress}>
            <div className={styles.progress__current}></div>
            <div className={styles.progress__new}></div>
            <div className={styles.progress__bg}></div>
          </div>
          <p className={styles.xp}>+ {xp} XP</p>
        </div>
      ) : (
        <div className={styles.content}>
          <p className={styles.instruction}>Claim your reward</p>
          <div className={styles.btn__primary}>
            <p className={styles.btn__txt}>Create an account</p>
          </div>
          <div className={styles.btn__secondary}>
            <p className={styles.btn__txt}>Sign in</p>
          </div>
          <p className={styles.btn__tertiary}>I don't want a reward</p>
        </div>
      )}
    </section>
  );
}
 
export default Reward;