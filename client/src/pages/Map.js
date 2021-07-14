import Navbar from '../components/Navbar';
import styles from '../styles/Map.Module.css';

const Map = () => {
  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Map" />
    </section>
  );
}
 
export default Map;