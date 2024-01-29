import React, { useState } from "react";

const App = () => {
  const [location, setLocation] = useState(null);

  return (
    <div className="container">
      <h1 className="text-box">MY WEATHER APP</h1>
      <input
        type="text"
        id="LocationInput"
        placeholder="Enter a City"
        onChange={(e) => setLocation(e.target.value)}
      />
      {location ? (
        <div className="weather-info">
          <p id="location">{location}</p>
          <p id="temperature" />
          <p id="description" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
