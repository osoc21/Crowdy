import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.Module.css';
import { useHistory } from "react-router-dom";

const Navbar = ({ previous, title, options = [] }) => {
  let history = useHistory();

  return (
    <div className={styles.container}>
      {previous !== '' ? (
        <Link to={previous}>
          <div className={styles.btn__back} />
        </Link>
      ) : (
        <div className={styles.btn__back} onClick={() => history.goBack()}></div>
      )}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.options}>
        {options.map(item => <div className={styles[`btn__${item.name}`]} onClick={item.action} key={item.name} />)}
      </div>
    </div>
  );
}
 
export default Navbar;