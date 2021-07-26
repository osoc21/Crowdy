import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Form.Module.css';

const Register = () => {
  return (
    <section className={styles.container}>
      {/* WHAT IS THE PREVIOUS LINK? THIS DEPENDS */}
      <Navbar previous="" title="sign up" options={[]} />
      <div className={styles.content}>
        <p className={styles.instructions}>Create your own Crowdy-account!</p>
        <form className={styles.form} method="post">
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="firstname">First name</label>
            <input className={styles.form__field__input} type="text" name="firstname" id="firstname" placeholder="Pieter" required></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="lastname">Last name</label>
            <input className={styles.form__field__input} type="text" name="lastname" id="lastname" placeholder="Desmet" required></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="email">Email</label>
            <input className={styles.form__field__input} type="email" name="email" id="email" placeholder="pieter.desmet@gmail.com" required></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="password">Password</label>
            <input className={styles.form__field__input} type="password" name="password" id="password" placeholder="••••••••" required></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="passwordconfirm">Confirm Password</label>
            <input className={styles.form__field__input} type="password" name="passwordconfirm" id="passwordconfirm" placeholder="••••••••" required></input>
          </div>
          <div className={styles.form__field}>
            <input className={styles.btn__primary} type="submit" value="Create account" />
          </div>
        </form>
        <Link to="/login">
          <div className={styles.btn__tertiary}>Already have an account? Sign in!</div>
        </Link>
      </div>
    </section>
  );
}
 
export default Register;