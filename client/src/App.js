import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './styles/App.Module.css';
import Home from './pages/Home';
import Hotspots from './pages/Hotspots';
import Hotspot from './pages/Hotspot';
import Scan from './pages/Scan';
import Report from './pages/Report';
import Reward from './pages/Reward';
import Map from './pages/Map';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  //const [account, setAccount] = useState(false);
  // eslint-disable-next-line
  const [hotspots, setHotspots] = useState([
    {
      name: 'korenmarkt',
      longitude: 3.7195936,
      latitude: 51.0546034,
      crowdedness: 1,
      type: "square",
      services: ["toilet"]
    },
    {
      name: 'citadelpark',
      longitude: 3.7167535,
      latitude: 51.0366794,
      crowdedness: 2,
      type: "park",
      services: []
    },
    {
      name: 'vrijdagmarkt',
      longitude: 3.7241467,
      latitude: 51.05695,
      crowdedness: 3,
      type: "square",
      services: []
    }
  ]);

  const ranks = ['The Tourist', 'The Traveller', 'The Ranger', 'The King'];

  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/hotspots">
          <Hotspots hotspots={hotspots} />
        </Route>
        <Route path="/hotspot/:id">
          <Hotspot hotspots={hotspots} />
        </Route>
        <Route path="/scan">
          <Scan hotspots={hotspots} />
        </Route>
        <Route path="/report/:slug">
          <Report />
        </Route>
        <Route path="/reward">
          <Reward />
        </Route>
        <Route path="/map">
          <Map hotspots={hotspots} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile ranks={ranks} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
