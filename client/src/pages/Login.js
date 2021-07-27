import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Form.Module.css';
import { useMutation } from "@apollo/client";
import { USER_LOGIN_API } from "../apis/userApis";

const Login = () => {
  const [ userLogin, { loading, data, error } ] = useMutation(USER_LOGIN_API);

  // When the user wants to log in
  const handleSubmitForm = e => {
    e.preventDefault();
    const $form = e.currentTarget;
    const formData = new FormData($form);

    userLogin({
      variables: {
        input: {
          email: formData.get(`email`),
          password: formData.get(`password`)
        }
      }
    });
  }

  // When the user has logged in
  if (data) {
    localStorage.setItem('userdata', JSON.stringify(data.UserLogin));
    return <Redirect to="/profile" />
  }

  return (
    <section className={styles.container}>
      <Navbar previous="" title="Log in" />
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmitForm}>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="email">Email address</label>
            <input className={styles.form__field__input} type="email" name="email" id="email" placeholder="john.doe@example.com"></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="password">Password</label>
            <input className={styles.form__field__input} type="password" name="password" id="password" placeholder="••••••••"></input>
          </div>
          <div className={styles.form__field}>
            {loading ? <p className={styles.loading}>Signing in...</p> : <input className={styles.btn__primary} type="submit" value="Log in" />}
          </div>
          {error ? (
            <div className={styles.form__field}>
              <p className={styles.error}>Server error</p>
            </div>
          ) : ''}
        </form>
        <Link to="/register">
          <div className={styles.btn__tertiary}>Don't have an account? Sign up!</div>
        </Link>
      </div>
    </section>
  );
}

export default Login;