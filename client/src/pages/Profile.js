import Navbar from '../components/Navbar';
import styles from '../styles/Profile.Module.css';

const Profile = ({ account, ranks }) => {
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

  const edit = () => {
    return false;
  };

  const navOptions = [
    { name: 'edit', action: edit }
  ];

  return (
    <section className={styles.container}>
      <Navbar previous="" title="your profile" options={navOptions} />
      {/*WHAT ELEMENTS IN THE PROFILE PICTURE?*/}
      <p className={styles.name}>{data.firstname} {data.lastname}</p>
      <p className={styles.rank}></p>
    </section>
  );
}
 
export default Profile;