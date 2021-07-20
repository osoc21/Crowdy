import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Hotspot.Module.css";
// eslint-disable-next-line
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const Hotspot = ({ hotspots }) => {
  const { id } = useParams();
  const data = hotspots[id];
  const dateCurrent = new Date();

  const [viewport, setViewport] = useState({
    longitude: data.longitude,
    latitude: data.latitude,
    zoom: 15
  });

  const markers = useMemo(() => hotspots.map(
    (city, index) => (
      <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} >
        <Link to={`/hotspot/${index}`} className={styles.marker}>
          <div className={styles[`marker__${city.crowdedness.toString().padStart(2, '0')}`]} />
        </Link>
      </Marker>
    )
  ), [hotspots]);

  const crowdedness = ["Unknown", "Calm", "Rather crowded", "CROWDY!"];

  const [favourites, setFavourites] = useState([2]);

  const changeFavourites = (hotspot) => {
    const tmp = [...favourites];
    favourites.includes(hotspot)
      ? tmp.splice(favourites.indexOf(hotspot), 1)
      : tmp.push(hotspot);
    setFavourites(tmp);
  };

  const navOptions = [{ name: "favourite", action: changeFavourites }];

  return (
    <section className={styles.container}>
      <Navbar previous="/hotspots" title="" options={navOptions} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.data}>
            <p className={styles.name}>{data.name}</p>
            <p className={styles.type}>{data.type} in Ghent</p>
            <ul className={styles.services}>
              {data.services.map((item) => (
                <div className={styles[`btn__${item}`]} key={item}></div>
              ))}
            </ul>
          </div>
          <div className={styles[`crowdedness__${data.crowdedness.toString().padStart(2, '0')}`]}>
            <div className={styles.crowdedness__icon}></div>
            <p className={styles.crowdedness__status}>{crowdedness[data.crowdedness]}</p>
            <p className={styles.crowdedness__info}>15 reports last 60 minutes</p>
          </div>
        </div>
        <div className={styles.map}>
          <ReactMapGL {...viewport} width="100vw" height="200px" onViewportChange={setViewport} mapStyle={`https://api.maptiler.com/maps/89880a13-40f8-4ec1-8b46-009ae4a9cbe4/style.json?key=${process.env.REACT_APP_MAPTILER_ACCESS_TOKEN}`}>
            {markers}
          </ReactMapGL>
        </div>
      </div>
    </section>
  );
};

export default Hotspot;
