import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 4.7577,
    longitude: 20.4376,
    zoom: 3
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker
              key = {entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude} 
            >
            <div
              onClick={() => {
                setShowPopup({
                  ...showPopup,
                  [entry._id]: true
                })
              }}  
            ><img src="https://i.imgur.com/y0G5YTX.png" style={{width:"30px",height:"30px"}}/></div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => {
                    setShowPopup({
                      ...showPopup,
                      [entry._id]: false
                    })
                  }}
                  anchor="top">
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.updatedAt).toLocaleDateString()}</small>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;