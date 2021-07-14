import Navbar from '../components/Navbar';
import styles from '../styles/Scan.Module.css';

const Scan = () => {
  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Scan" />
      <div className={styles.scanner}>
        {/* add videostream here */}
        <p className={styles.instruction}>Scan the QR-code at the hotspot</p>
        <img className={styles.focus__area} src="./assets/img/qr-code-focus-area.svg" alt="focus area"></img>
      </div>
    </section>
  );
}
 
export default Scan;