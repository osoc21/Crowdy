import Navbar from '../components/Navbar';
import styles from '../styles/Map.Module.css';

import React, { useMemo } from 'react';
//import maplibregl from 'maplibre-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ReactMapGL, {Marker} from 'react-map-gl';
 
//maplibregl.accessToken = '';

const Map = (props) => {
  //const mapContainer = useRef(null);
  //const map = useRef(null);

  /*useEffect(() => {
    if (map.current) return; // initialize map only once

    const geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
              'message': 'Kinepolis Ghent',
              'iconSize': [60, 60]
          },
          'geometry': {
              'type': 'Point',
              'coordinates': [51.0417487, 3.729538]
          }
        }
      ]
    };

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/89880a13-40f8-4ec1-8b46-009ae4a9cbe4/style.json?key=T7NTZW6EztewUEILqdT5',
      center: [3.73309, 51.05323],
      zoom: 13.57
    });

    // add markers to map
    geojson.features.forEach(function (marker) {
      // create a DOM element for the marker
      let el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage =
        'url(https://placekitten.com/g/' +
        marker.properties.iconSize.join('/') +
        '/)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';

      el.addEventListener('click', function () {
        window.alert(marker.properties.message);
      });

      // add marker to map
      new maplibregl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });

    map.on('load', () => {
      // Add an image to use as a custom marker
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  // feature for Mapbox DC
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [51.0417487, 3.729538]
                  },
                  'properties': {
                    'title': 'Kinepolis Ghent'
                  }
                }
              ]
            }
          });

          // Add a symbol layer
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
        }
      );
    });

    return () => map.remove();
  }, []);*/

  const [viewport, setViewport] = React.useState({
    longitude: 3.72800,
    latitude: 51.05323,
    zoom: 13
  });

  const handleClickMarker = name => {
    console.log(name);
  };

  // Only rerender markers if props.data has changed
  const markers = useMemo(() => props.data.map(
    city => (
      <Marker key={city.name} longitude={city.longitude} latitude={city.latitude} >
        {/* <p>[Marker]</p> */}
        <div className={styles.marker} onClick={() => handleClickMarker(city.name)}>
          <img className={styles.marker__img} src="/logo192.png" alt="marker" width="48" height="48" />
        </div>
      </Marker>
    )
  ), [props.data]);

  return (
    <section className={styles.container}>
      <Navbar previous="/" title="Map" />
      <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport} mapStyle={`https://api.maptiler.com/maps/89880a13-40f8-4ec1-8b46-009ae4a9cbe4/style.json?key=${process.env.REACT_APP_MAPTILER_ACCESS_TOKEN}`}>
        {markers}
      </ReactMapGL>
      {/* <div ref={mapContainer} className={styles.map} /> */}
    </section>
  );
}
 
export default Map;