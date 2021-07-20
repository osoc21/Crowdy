import { useState /*,useEffect, useRef*/ } from 'react';
import Navbar from '../components/Navbar';
// import Stream from '../components/Stream';
import styles from '../styles/Scan.Module.css';
import QrReader from 'react-qr-reader'
import { Redirect } from 'react-router-dom';

const Scan = ({ hotspots }) => {
  // const videoRef = useRef(null);
  // const [init, setInit] = useState(false);

  // useEffect(() => {
  //   setInit(true);
  // }, [videoRef]);

  // const handleCanPlay = () => {
  //   videoRef.current.play();
  // }

  const [code, setCode] = useState({ result: 'No result' });

  const handleScan = data => {
    if (data) {
      setCode({ result: data });
      console.log(data);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  // Checking if the code is valid
  if (code.result.includes('crowdy')) {
    const hotspotNames = hotspots.map(item => item.name);
    const locationSplit = code.result.split('/');
    let locationHotspot = '';
    let counter = 0;
    do {
      counter ++;
      locationHotspot = locationSplit[locationSplit.length - counter];
    }
    while (locationHotspot === '')
    console.log(locationHotspot);
    //locationHotspot = `vrijdagsmarkt`;
    if (hotspotNames.includes(locationHotspot)) {
      return <Redirect to={`/report/${locationHotspot}`} />
    }
  }

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Scan" />
      <div className={styles.scanner}>
        {/* <Stream ref={videoRef} ready={init} handleCanPlay={handleCanPlay} /> */}
        <p className={styles.instruction}>Scan the QR-code at the hotspot</p>
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100vw' }}
          />
        </div>
        {/* <img className={styles.focus__area} src="./assets/img/qr-code-focus-area.svg" alt="focus area"></img> */}
      </div>
    </section>
  );
}
 
export default Scan;