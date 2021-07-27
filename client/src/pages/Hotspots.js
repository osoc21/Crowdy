import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import styles from "../styles/Hotspots.Module.css";
import { getAverageFromVotes } from "../js/functions";
import { useQuery } from "@apollo/client";
import { ALL_ACTIVE_HOTSPOTS } from "../apis/hotspotApis";

const Hotspots = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState({
    sort: 'crowdedness',
    type: []
  });

  // Changing the parameters of the filter based on user-input
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

  // Defining which actions the user can do in the navigationbar
  const navOptions = [
    { name: "filter", action: () => setIsFilter(true) }
  ];

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

  // When the data is loading...
  if (loading) {
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Hotspots" options={navOptions} />
        <LoadingScreen text="Loading hotspots" />
      </section>
    );
  }

  // When an error has occured
  if (error) {
    console.log(error);
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Hotspots" options={navOptions} />
        <ErrorScreen text="Failed to load hotspots" />
      </section>
    );
  }

  // When the data has been retrieved
  if (data) {
    return (
      <section className={styles.container}>
        <Navbar previous="/" title="Hotspots" options={navOptions} />
        <div className={styles.content}>
          <div className={styles.list__container}>
            <div className={styles.filter__list}>
              <p>Filtered on: {/*filters.join(', ')*/}</p>
            </div>
            <ul className={styles.list}>
              {data.AllActiveHotspot.hotspots.map((item, index) => (
                <li className={styles.list__item} key={item.hotspot_name}>
                  <Link to={`/hotspot/${item.id}`} className={styles[`list__item__${Math.round(getAverageFromVotes(item.votes)).toString().padStart(2, '0')}`]}>
                    <p className={styles.item__name}>{item.hotspot_name}</p>
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
              <div className={styles.filter__btn__close} onClick={() => setIsFilter(false)} />
            </div>
            <form className={styles.filter__form}>
              <div className={styles.filter__field} key="sort">
                <p className={styles.filter__field__title}>Sort by</p>
                <div className={styles.filter__input__sortby}>
                  {['Name', 'Crowdedness'].map(item => (
                    <div className={styles.filter__item} key={item}>
                      <input className={styles.filter__input} key={`${item}__radio`} onChange={changeFilter} type="radio" name="sort" id={item} value={item.toLowerCase()} defaultChecked={item === 'Crowdedness'} />
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
  }
};

export default Hotspots;
