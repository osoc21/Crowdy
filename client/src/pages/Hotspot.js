import { useState } from "react";
import Navbar from "../components/Navbar";
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import styles from "../styles/Hotspot.Module.css";
import { useParams } from "react-router-dom";
import { useMemo } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { useQuery } from "@apollo/client";
import { GET_SELECTED_HOTSPOT } from "../apis/hotspotApis";
import { getTimeElapsedInMilli, formatMilliToTimeElapsed, getAverageFromVotes, getRecentVotes } from "../js/functions"

const Hotspot = () => {
  // Retrieving the id from the URL to display the correct hotspot
  const { id } = useParams();

  // Defining how and what to show on the map
  const [viewport, setViewport] = useState({ longitude: 3.72800, latitude: 51.05100, zoom: 15 });
  const crowdedness = ["Unknown", "Calm", "Rather crowded", "CROWDY!"];

  // Retrieving the data from the specific hotspot
  const { loading, data, error, } = useQuery(GET_SELECTED_HOTSPOT, {
    fetchPolicy: "network-only",
    variables: { id },
    onError(error) {
      alert("Failed to load hotspots, Refresh The page!");
    },
    onCompleted(data) {
      //console.log(data);
      setViewport({ longitude: data.SelectedHotspot.coordinates[1], latitude: data.SelectedHotspot.coordinates[0] + 0.0005, zoom: 15 })
    },
  });

  // Creating the markers separately and memoizing them for better performance
  const markers = useMemo(() => data && data.SelectedHotspot.coordinates.length ? (
      <Marker key={data.SelectedHotspot.hotspot_name} longitude={data.SelectedHotspot.coordinates[1]} latitude={data.SelectedHotspot.coordinates[0]} >
        <div className={styles[`marker__${Math.round(getAverageFromVotes(getRecentVotes(data.SelectedHotspot.votes, 120))).toString().padStart(2, '0')}`]} />
      </Marker>
    ) : '', [data]);

  // Adding/removing the hotspot to/from the list of favourites
  /* 
  const changeFavourites = () => {
    setFavourites(previous => {
      let tmp = [...previous];
      if (tmp.includes(id)) {
        tmp.splice(previous.indexOf(id), 1);
      } else {
        tmp.push(id);
      }
      localStorage.setItem('favourites', JSON.stringify(tmp));
      return tmp;
    });
  };
  */

  // Defining which actions the user can do in the navigationbar
  /* There is an option to add a hotspot to the favourites, but we disabled it for now
  const navOptions = [
    { 
      name: "favourite", 
      action: changeFavourites,
      icon: `favourite__${favourites.includes(id)}`
    }
  ];
  */
 const navOptions = [];

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

  // Getting the elapsed time of the latest vote
  const getLatestVote = votes => {
    const latestVote = votes[votes.length - 1];
    const timeElapsed = getTimeElapsedInMilli(latestVote.updatedAt);
    const formatTimeElapsed = formatMilliToTimeElapsed(timeElapsed);
    return formatTimeElapsed;
  };

  // Creating a readible address
  const getAddress = d => {
    let address = d.street;
    if (d.number) address += ` `;
    address += d.number;
    if (d.street || d.number) address += `, `;
    address += d.city;
    return `${address}`;
  };

  // When the data has been retrieved
  if (data) {
    const recentVotes = getRecentVotes(data.SelectedHotspot.votes, 60);
    const address = getAddress(data.SelectedHotspot);
    return (
      <section className={styles.container}>
        <Navbar previous="/hotspots" title="" options={navOptions} />
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.data}>
              <p className={styles.name}>{data.SelectedHotspot.hotspot_name}</p>
              <p className={styles.type}>{data.SelectedHotspot.types.map(type => type.type_name).join(`/`)} in Ghent</p>
              {address !== `` ? <p className={styles.address}>({address})</p> : ''}
              <ul className={styles.services}>
                {data.SelectedHotspot.services.map((item) => (
                  <div className={styles[`service__${item.service_name.split(` `).join(`__`)}__icon`]} key={item.service_name} />
                ))}
              </ul>
            </div>
            <div className={styles[`crowdedness__${Math.round(getAverageFromVotes(getRecentVotes(data.SelectedHotspot.votes, 120))).toString().padStart(2, '0')}`]}>
              <div className={styles.crowdedness__icon} />
              <p className={styles.crowdedness__status}>{crowdedness[Math.round(getAverageFromVotes(data.SelectedHotspot.votes))]}</p>
              <p className={styles.crowdedness__info}>{recentVotes.length ? 
              `${recentVotes.length} report${recentVotes.length !== 1 ? 's' : ''} in the last 60 minutes` 
              : data.SelectedHotspot.votes.length ? `Last reported: ${getLatestVote(data.SelectedHotspot.votes)} ago`
              : `No reports were found`}</p>
            </div>
          </div>
          <div className={styles.map}>
            <ReactMapGL {...viewport} width="100vw" height="260px" onViewportChange={setViewport} mapStyle={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN_STYLE}`}>
              {markers}
            </ReactMapGL>
          </div>
        </div>
      </section>
    );
  }
};

export default Hotspot;
