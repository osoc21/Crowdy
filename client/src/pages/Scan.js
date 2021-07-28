import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Scan.Module.css';
import QrReader from 'react-qr-reader'
import { Redirect } from 'react-router-dom';
//import { useQuery } from "@apollo/client";
//import { GET_SELECTED_HOTSPOT } from "../apis/hotspotApis";

const Scan = () => {
  const [code, setCode] = useState(null);

  // Scanning for codes...
  const handleScan = data => {
    // Checking if data was found
    if (data) {
      // Checking if the code is valid
      if (data.includes(process.env.REACT_APP_BASE_URL)) {
        const locationSplit = data.split('/');
        let id = '';
        let counter = 0;
        do {
          counter ++;
          id = locationSplit[locationSplit.length - counter];
        }
        while (id === '')

        // CHECKING IF THE ID EXISTS //

        setCode(id);
      }
    }
  }

  // When an error has occured during the scanning
  const handleError = err => {
    //console.error(err);
  }

  // Redirecting to the report-page if a valid code has been found
  if (code) {
    return <Redirect to={`/report/${code}`} />
  }

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Scan" />
      <div className={styles.scanner}>
        <p className={styles.instruction}>Scan the QR-code at the hotspot</p>
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100vw' }}
          />
        </div>
      </div>
    </section>
  );
}
 
export default Scan;