import Navbar from '../components/Navbar';
import styles from '../styles/Map.Module.css';
import { Link } from "react-router-dom";
import { useState, useMemo } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const Map = ({ hotspots }) => {
  // Defining how and what to show on the map
  const [viewport, setViewport] = useState({
    longitude: 3.72800,
    latitude: 51.05100,
    zoom: 12.5
  });

  // Creating the markers separately and memoizing them for better performance
  const markers = useMemo(() => hotspots.map(
    (city, index) => (
      <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} >
        <Link to={`/hotspot/${index}`} className={styles.marker}>
          <div className={styles[`marker__${city.crowdedness.toString().padStart(2, '0')}`]} />
        </Link>
      </Marker>
    )
  ), [hotspots]);

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Map" />
      <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport} mapStyle={`https://api.maptiler.com/maps/89880a13-40f8-4ec1-8b46-009ae4a9cbe4/style.json?key=${process.env.REACT_APP_MAPTILER_ACCESS_TOKEN}`}>
        {markers}
      </ReactMapGL>
    </section>
  );
}
 
export default Map;