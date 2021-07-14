import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Login.Module.css';

const Login = () => {
  return (
    <section className={styles.container}>
      {/* WHAT IS THE PREVIOUS LINK? THIS DEPENDS */}
      <Navbar previous="" title="sign in" options={[]} />
      <form className={styles.form} method="post">
        <div className={styles.form__field}>
          <label className={styles.form__field__label} htmlFor="email">Email</label>
          <input className={styles.form__field__input} type="email" name="email" id="email" placeholder="john.doe@example.com"></input>
        </div>
        <div className={styles.form__field}>
          <label className={styles.form__field__label} htmlFor="password">Password</label>
          <input className={styles.form__field__input} type="password" name="password" id="password" placeholder="password"></input>
        </div>
        <div className={styles.form__field}>
          <input className={styles.btn__primary} type="submit">Sign in</input>
        </div>
      </form>
      <Link to="/register">
        <div className={styles.link}>Dont have an account? Sign up here!</div>
      </Link>
    </section>
  );
}
 
export default Login;