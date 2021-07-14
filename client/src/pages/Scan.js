import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Stream from '../components/Stream';
import styles from '../styles/Scan.Module.css';

const Scan = () => {
  const videoRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, [videoRef]);

  const handleCanPlay = () => {
    videoRef.current.play();
  }

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Scan" />
      <div className={styles.scanner}>
        <Stream ref={videoRef} ready={init} handleCanPlay={handleCanPlay} />
        <p className={styles.instruction}>Scan the QR-code at the hotspot</p>
        <img className={styles.focus__area} src="./assets/img/qr-code-focus-area.svg" alt="focus area"></img>
      </div>
    </section>
  );
}
 
export default Scan;