import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Form.Module.css';

const Login = () => {
  return (
    <section className={styles.container}>
      <Navbar previous="" title="Log in" options={[]} />
      <div className={styles.content}>
        <form className={styles.form} method="post">
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="email">Email</label>
            <input className={styles.form__field__input} type="email" name="email" id="email" placeholder="john.doe@example.com"></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="password">Password</label>
            <input className={styles.form__field__input} type="password" name="password" id="password" placeholder="••••••••"></input>
          </div>
          <div className={styles.form__field}>
            <input className={styles.btn__primary} type="submit" value="Log in" />
          </div>
        </form>
        <Link to="/register">
          <div className={styles.btn__tertiary}>Don't have an account? Sign up!</div>
        </Link>
      </div>
    </section>
  );
}

export default Login;