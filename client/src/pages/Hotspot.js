import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Hotspot.Module.css";
// eslint-disable-next-line
import { formatDateFromMilliToDate } from "../js/functions";

const Hotspot = () => {
  const dateCurrent = new Date();

  const data = {
    name: "korenmarkt",
    type: "square",
    services: ["toilet"],
    crowdedness: 1,
    created_at: new Date(`July ${dateCurrent.getDate()}, 2021 09:02:34`),
  };
  // eslint-disable-next-line
  const difference = dateCurrent.getTime() - data.created_at.getTime();
  console.log(`Difference: `);

  const crowdedness = ["calm & quiet", "comfortable", "too crowded"];

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
      <Navbar previous="/hotspots" title="details" options={navOptions} />
      <p className={styles.name}>{data.name}</p>
      <p className={styles.type}>{data.type} in Ghent</p>
      <ul className={styles.services}>
        {data.services.map((item) => (
          <div className={styles[`btn__${item}`]} key={item}></div>
        ))}
      </ul>
      <p className={styles.crowdedness}>
        {crowdedness[data.crowdedness - 1]} ({data.crowdedness})
      </p>
      <p className={styles.last__reported}>Last reported: 34 minutes ago</p>
      <div className={styles.map}></div>
    </section>
  );
};

export default Hotspot;
