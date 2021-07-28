import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Profile.Module.css';
import { useState } from 'react';
import { formatDateFromDateToNumber } from "../js/functions";

const Profile = () => {
  const [userData, setUserData] = useState(false);
  console.log(userData);

  if (localStorage.getItem('userdata') !== null && localStorage.getItem('userdata') !== undefined && !userData) {
    setUserData(JSON.parse(localStorage.getItem('userdata')));
  }

  const logout = () => {
    localStorage.removeItem('userdata');
    setUserData(false);
  };

  // Defining which actions the user can do in the navigationbar
  const navOptions = [
    { name: 'logout', action: () => logout() }
  ];

  if (!userData) {
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="your profile" options={navOptions} />
        <div className={styles.content}>
          <div className={styles.loggedout}>
            <p className={styles.instruction}>Save your rewards to your account</p>
            <Link to="/login">
              <div className={styles.btn__secondary}>
                <p>Log in</p>
              </div>
            </Link>
            <Link to="/register">
              <div className={styles.btn__primary}>
                <p>Create an account</p>
              </div>
            </Link>
            <Link to="/">
              <div className={styles.btn__tertiary}>I don't want an account</div>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="your profile" options={navOptions} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.name__container}>
            <p className={styles.name}>{userData.fullname}</p>
            <div className={styles.btn__edit} />
          </div>
          <p className={styles.created}>Member since {formatDateFromDateToNumber(userData.createdAt)}</p>
          <div className={styles.profile__picture} />
        </div>
        <div className={styles.data}>
          <p className={styles.rank}>The Ranger</p>
          <div className={styles.progress}>
            <div className={styles.progress__bar}></div>
          </div>
          <div className={styles.nav}>
            <div className={styles.scanned}>
              <p className={styles.scanned__title}>Scanned</p>
              <p className={styles.scanned__number}>28</p>
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