import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/Hotspots.Module.css";

// ** GRAPHQL IMPORTS
import { useQuery } from "@apollo/client";
import { ALL_ACTIVE_HOTSPOTS } from "../apis/hotspotApis";

const Hotspots = ({ hotspots }) => {
  const [filters, setFilters] = useState([
    "sorted by crowdedness",
    "parks only",
  ]);
  const [hotspotsList, setHotspotsList] = useState(hotspots);
  const [isFilter, setIsFilter] = useState(false);

  const temp = () => {
    setFilters(false);
    setHotspotsList(false);
  };

  const showFilter = () => {
    temp();
    setIsFilter(!isFilter);
  };

  const navOptions = [{ name: "filter", action: showFilter }];

  // ** GRAPHQL QUERY CODE
  // eslint-disable-next - line;
  const {
    loading,
    data: data_hotspot,
    error,
  } = useQuery(ALL_ACTIVE_HOTSPOTS, {
    fetchPolicy: "network-only",
    onError(error) {
      //alert("Failed to load hotspots, Refresh The page!");
    },
    onCompleted(data_hotspot) {
      console.log(data_hotspot);
      // Some code to execute
    },
  });

  if (loading) {
    console.log("Yay...I am loading!!");
  }

  if (data_hotspot) {
    console.log(data_hotspot.AllActiveHotspot[0]);
  }

  if (error) {
    console.log("Damn!");
  }

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="hotspots" options={navOptions} />
      <div className={styles.content}>
        <div className={styles.filter__list}>
          <p>Filtered on: {filters.join(', ')}</p>
        </div>
        <ul className={styles.list}>
          {hotspotsList.map((item, index) => (
            <li className={styles.list__item} key={item.name}>
              <Link to={`/hotspot/${index}`} className={styles[`list__item__${item.crowdedness.toString().padStart(2, '0')}`]}>
                <p className={styles.item__name}>{item.name}</p>
                <div className={styles[`favourite__icon__${false}`]} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hotspots;
