import Navbar from '../components/Navbar';
import styles from '../styles/Reward.Module.css';

const Reward = () => {
  // Test account data
  const loggedIn = true;
  const account = {
    firstname: 'Pieter',
    lastname: 'Desmet',
    rank: 'Streetrat'
  }
  const xp = 30;

  return (
    <section className={styles.container}>
      <Navbar previous="" title="Reward" />
      {loggedIn ? (
        <div className={styles.content__loggedin}>
          <p className={styles.name}>Thank you {account.firstname}!</p>
          <p className={styles.rank}>{account.rank}</p>
          <div className={styles.padding}>
            <div className={styles.profile__picture}></div>
            <div className={styles.progress}>
              <div className={styles.progress__bar}></div>
            </div>
            <p className={styles.xp}>+ {xp} XP</p>
          </div>
        </div>
      ) : (
        <div className={styles.content__loggedout}>
          <p className={styles.instruction}>Claim your reward</p>
          <div className={styles.btn__primary}>
            <p className={styles.btn__txt}>Create an account</p>
          </div>
          <div className={styles.btn__secondary}>
            <p className={styles.btn__txt}>Log in</p>
          </div>
          <p className={styles.btn__tertiary}>I don't want a reward</p>
        </div>
      )}
    </section>
  );
}
 
export default Reward;