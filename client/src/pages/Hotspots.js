import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/Hotspots.Module.css";

// ** GRAPHQL IMPORTS
import { useQuery } from "@apollo/client";
import { ALL_ACTIVE_HOTSPOTS } from "../apis/hotspotApis";

const Hotspots = ({ hotspots }) => {
  const [hotspotsList, setHotspotsList] = useState(hotspots);
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState({
    sort: 'crowdedness',
    type: []
  });

  const showFilter = () => {
    setIsFilter(true);
  };

  const changeFilter = e => {
    const { name, value } = e.target;
    let tmp = {...filters};
    if (Array.isArray(tmp[name])) {
      if (tmp[name].includes(value)) {
        tmp[name].splice(tmp[name].indexOf(value), 1);
      } else {
        tmp[name].push(value);
      }
    } else {
      tmp[name] = value;
    }
    setFilters(tmp);
  }

  console.log(filters);

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
        <div className={styles.list__container}>
          <div className={styles.filter__list}>
            <p>Filtered on: {/*filters.join(', ')*/}</p>
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
        <div className={styles[`filter__container${isFilter ? `` : `__hidden`}`]}>
          <div className={styles.filter__header}>
            <div />
            <p className={styles.filter__title}>Filters</p>
            <div className={styles.filter__btn__close} onClick={() => setIsFilter(false)}>[CLOSE]</div>
          </div>
          <form className={styles.filter__form}>
            <div className={styles.filter__field} key="sort">
              <p className={styles.filter__field__title}>Sort by</p>
              <div className={styles.filter__input__sortby}>
                {['Name', 'Crowdedness'].map(item => (
                  <div className={styles.filter__item} key={item}>
                    <input className={styles.filter__input} key={`${item}__radio`} onChange={changeFilter} type="radio" name="sort" id={item} value={item.toLowerCase()} />
                    <label className={styles.filter__label} key={`${item}__lbl`} htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.filter__field} key="type">
              <p className={styles.filter__field__title}>Type</p>
              <div className={styles.filter__input__type}>
                {['Campus', 'Park', 'Square', 'Street'].map(item => (
                  <div className={styles.filter__item} key={item}>
                    <input className={styles.filter__input} key={`${item}__chk`} onChange={changeFilter} type="checkbox" name="type" id={item} value={item.toLowerCase()} />
                    <label className={styles.filter__label} key={`${item}__lbl`} htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hotspots;
