import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Form.Module.css';
import { useMutation } from "@apollo/client";
import { USER_SIGNUP_API } from "../apis/userApis";

const Register = () => {
  const [errorForm, setErrorForm] = useState({});
  const [ UserRegister, { loading, data, error } ] = useMutation(USER_SIGNUP_API);

  // When the form is submitted
  const handleSubmitForm = e => {
    e.preventDefault();
    const $form = e.currentTarget;
    const formData = new FormData($form);

    // Checking if the password contains 8 characters or more
    if (formData.get(`password`).length < 8) {
      setErrorForm({ password: 'Password must contain a minimum of 8 characters' });
      return;
    }

    // Checking if the passwords match
    if (formData.get(`password`) !== formData.get(`passwordconfirm`)) {
      setErrorForm({ passwordconfirm: 'Passwords do not match' });
      return;
    }

    // Registering the user
    UserRegister({
      variables: {
        input: {
          firstname: formData.get(`firstname`),
          lastname: formData.get(`lastname`),
          email: formData.get(`email`),
          password: formData.get(`password`)
        }
      }
    });
  }

  // When the user has registered
  if (data) {
    console.log(data);
    //localStorage.setItem('accessToken', data.accessToken);
    return <Redirect to="/profile" />
  }

  return (
    <section className={styles.container}>
      <Navbar previous="" title="sign up" options={[]} />
      <div className={styles.content}>
        <p className={styles.instructions}>Create your own Crowdy-account!</p>
        <form className={styles.form} onSubmit={handleSubmitForm}>
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
            <label className={styles.form__field__label} htmlFor="password">
              <p>Password</p>
              <p className={styles.form__field__label__extra}>Must contain a minimum of 8 characters</p>
            </label>
            <input className={styles.form__field__input} type="password" name="password" id="password" placeholder="••••••••" required></input>
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__field__label} htmlFor="passwordconfirm">Confirm Password</label>
            <input className={styles.form__field__input} type="password" name="passwordconfirm" id="passwordconfirm" placeholder="••••••••" required></input>
          </div>
          <div className={styles.form__field}>
            {loading ? <p className={styles.loading}>Creating account...</p> : <input className={styles.btn__primary} type="submit" value="Create account" />}
          </div>
          {error ? (
            <div className={styles.form__field}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : ''}
        </form>
        <Link to="/login">
          <div className={styles.btn__tertiary}>Already have an account? Sign in!</div>
        </Link>
      </div>
    </section>
  );
}
 
export default Register;