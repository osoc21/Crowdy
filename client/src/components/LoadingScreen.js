import styles from "./../styles/Vars.Module.css";

const LoadingScreen = ({ text }) => {
  return (
    <p className={styles.loading}>{text}...</p>
  );
}
 
export default LoadingScreen;