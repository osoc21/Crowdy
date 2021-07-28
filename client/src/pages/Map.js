import Navbar from '../components/Navbar';
import styles from '../styles/Map.Module.css';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import { Link } from "react-router-dom";
import { useState, useMemo } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { getAverageFromVotes, getRecentVotes } from "../js/functions";
import { useQuery } from "@apollo/client";
import { ALL_ACTIVE_HOTSPOTS } from "../apis/hotspotApis";

const Map = () => {
  // Defining how and what to show on the map
  const [viewport, setViewport] = useState({
    longitude: 3.72800,
    latitude: 51.05100,
    zoom: 12.5
  });

  // Retrieving the hotspots from the server
  const { loading, data, error, } = useQuery(ALL_ACTIVE_HOTSPOTS, {
    fetchPolicy: "network-only",
    onError(error) {
      alert("Failed to load hotspots, Refresh The page!");
    },
    onCompleted(data) {
      console.log(data);
    },
  });

  // Creating the markers separately and memoizing them for better performance
  const markers = useMemo(() => data ? data.AllActiveHotspot.hotspots.map(
    (hotspot) => (
      <Marker key={hotspot.hotspot_name} longitude={hotspot.coordinates[1]} latitude={hotspot.coordinates[0]} >
        <Link to={`/hotspot/${hotspot.id}`} className={styles.marker}>
          <div className={styles[`marker__${Math.round(getAverageFromVotes(getRecentVotes(hotspot.votes, 120))).toString().padStart(2, '0')}`]} />
        </Link>
      </Marker>
    )
  ) : '', [data]);

  // When the data is loading...
  if (loading) {
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Map" />
        <LoadingScreen text="Loading map" />
      </section>
    );
  }

  // When an error has occured
  if (error) {
    console.log(error);
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Map" />
        <ErrorScreen text="Failed to load map" />
      </section>
    );
  }

  if (data) {
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Map" />
        <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport} mapStyle={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN_STYLE}`}>
          {markers}
        </ReactMapGL>
      </section>
    );
  }
}
 
export default Map;