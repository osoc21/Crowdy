import Navbar from '../components/Navbar';
import styles from '../styles/Profile.Module.css';

const Profile = ({ account, ranks }) => {
  // Test account data
  const data = {
    firstname: 'Pieter',
    lastname: 'Desmet',
    rank: ranks[3 - 1],
    exp: 170,
    scanned: 28,
    created_at: '1987-02-29',
    badges: [3, 6, 14],
    discounts: [{
        company: 'Dominos',
        code: 'ABCDE12345',
        text: 'Get a 10% discount on your next purchase'
      },
      {
        company: 'Pizza Hut',
        code: 'QWERTY123456',
        text: 'Get 2 euros discount on your next pizza!'
      }
    ]
  }

  const logout = () => {
    return false;
  };

  // Defining which actions the user can do in the navigationbar
  const navOptions = [
    { name: 'logout', action: logout }
  ];

  return (
    <section className={styles.container}>
      <Navbar previous="" title="your profile" options={navOptions} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.name__container}>
            <p className={styles.name}>{data.firstname} {data.lastname}</p>
            <div className={styles.btn__edit} />
          </div>
          <p className={styles.created}>Member since 01/01/1960</p>
          <div className={styles.profile__picture} />
        </div>
        <div className={styles.data}>
          <p className={styles.rank}>Streetrat</p>
          <div className={styles.progress}>
            <div className={styles.progress__bar}></div>
          </div>
          <div className={styles.nav}>
            <div className={styles.scanned}>
              <p className={styles.scanned__title}>Scanned</p>
              <p className={styles.scanned__number}>{data.scanned}</p>
              <p className={styles.scanned__unit}>Times</p>
              <div className={styles.scanned__icon} />
            </div>
            <div className={styles.leaderboard}>
              <p className={styles.leaderboard__title}>Leaderboard</p>
              <div className={styles.leaderboard__icon} />
            </div>
          </div>
          <div className={styles.badges__container}>
            <p className={styles.badges__title}>Badges</p>
            <ul className={styles.badges}>
              <li className={styles.badge__extra}></li>
              <li className={styles.badge} />
              <li className={styles.badge} />
              <li className={styles.badge} />
              <li className={styles.badge} />
              <li className={styles.badge} />
              <li className={styles.badge__extra}></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
 
export default Profile;