import styles from "./../styles/Vars.Module.css";

const ErrorScreen = ({ text }) => {
  return (
    <p className={styles.error}>{text}</p>
  );
}
 
export default ErrorScreen;