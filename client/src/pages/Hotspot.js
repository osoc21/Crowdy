import { useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import styles from "../styles/Hotspot.Module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { useQuery } from "@apollo/client";
import { GET_SELECTED_HOTSPOT } from "../apis/hotspotApis";

const Hotspot = ({ hotspots, favourites, setFavourites }) => {
  // Retrieving the id from the URL to display the correct hotspot
  const { id } = useParams();

  // Retrieving the data from the specific hotspot
  const { loading, data, error, } = useQuery(GET_SELECTED_HOTSPOT, {
    fetchPolicy: "network-only",
    variables: { id },
    onError(error) {
      alert("Failed to load hotspots, Refresh The page!");
    },
    onCompleted(data) {
      console.log(data);
    },
  });

  // Defining how and what to show on the map
  const [viewport, setViewport] = useState({
    longitude: data && data.SelectedHotspot.coordinates.length ? data.SelectedHotspot.coordinates[0] : 3.72800,
    latitude: data && data.SelectedHotspot.coordinates.length ? data.SelectedHotspot.coordinates[1] : 51.05100,
    zoom: 15
  });

  //const crowdedness = ["Unknown", "Calm", "Rather crowded", "CROWDY!"];

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

  // Adding/removing the hotspot to/from the list of favourites
  const changeFavourites = () => {
    const idHotspot = parseInt(id);
    setFavourites(previous => {
      let tmp = [...previous];
      if (tmp.includes(idHotspot)) {
        tmp.splice(previous.indexOf(idHotspot), 1);
      } else {
        tmp.push(idHotspot);
      }
      return tmp;
    });
  };

  // Defining which actions the user can do in the navigationbar
  const navOptions = [
    { 
      name: "favourite", 
      action: changeFavourites,
      icon: `favourite__${favourites.includes(parseInt(id))}`
    }
  ];

  // When the data is loading...
  if (loading) {
    return (
      <section className={styles.container}>
        <Navbar previous="/hotspots" title="" options={navOptions} />
        <LoadingScreen text="Loading hotspot" />
      </section>
    );
  }

  // When an error has occured
  if (error) {
    console.log(error);
    return (
      <section className={styles.container}>
        <Navbar previous="/hotspots" title="" options={navOptions} />
        <ErrorScreen text="Failed to load hotspot" />
      </section>
    );
  }

  // When the data has been retrieved
  if (data) {
    return (
      <section className={styles.container}>
        <Navbar previous="/hotspots" title="" options={navOptions} />
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.data}>
              <p className={styles.name}>{data.SelectedHotspot.hotspot_name}</p>
              <p className={styles.type}>{data.SelectedHotspot.types.join(`, `)} in Ghent</p>
              <ul className={styles.services}>
                {data.SelectedHotspot.services.map((item) => (
                  <div className={styles[`btn__${item.service_name}`]} key={item.service_name}></div>
                ))}
              </ul>
            </div>
            <div className={styles[`crowdedness__01`]}>
              <div className={styles.crowdedness__icon}></div>
              <p className={styles.crowdedness__status}></p>
              <p className={styles.crowdedness__info}>15 reports last 60 minutes</p>
            </div>
          </div>
          <div className={styles.map}>
            <ReactMapGL {...viewport} width="100vw" height="200px" onViewportChange={setViewport} mapStyle={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN_STYLE}`}>
              {markers}
            </ReactMapGL>
          </div>
        </div>
      </section>
    );
  }
};

export default Hotspot;
