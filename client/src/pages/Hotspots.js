import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/Hotspots.Module.css';

const Hotspots = ({ hotspots }) => {
  const [filters, setFilters] = useState(['sorted by crowdedness', 'parks only']);
  const [hotspotsList, setHotspotsList] = useState(hotspots);
  const [isFilter, setIsFilter] = useState(false);

  const temp = () => {
    setFilters(false);
    setHotspotsList(false);
  }

  const showFilter = () => {
    temp();
    setIsFilter(!isFilter);
  }

  const navOptions = [
    { name: 'filter', action: showFilter }
  ];

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="hotspots" options={navOptions} />
      <div className={styles.content}>
        <div className={styles.filter__list}>
          <p>Filters applied: {filters.join(', ')}</p>
        </div>
        <ul className={styles.list}>
          {hotspotsList.map(item => (
              <li className={styles.list__item} key={item.name}>
                <Link to="/hotspot">
                  <p className={styles.item__crowdedness}>{item.crowdedness}</p>
                  <p className={styles.item__name}>{item.name}</p>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
 
export default Hotspots;