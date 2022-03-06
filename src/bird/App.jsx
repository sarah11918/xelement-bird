import React from 'react';
import {useState, useContext} from 'react';
import LocationContext from './LocationContext.jsx';
import Regions from './Regions.jsx';
import Notable from './Notable.jsx';
import Recent from './Recent.jsx';
import RegionDate from './RegionDate.jsx'

const App = () => {
  //This is the global state- captures the default location -Canada Prince-Edward Island-Prince County
  const [defaultLocation, setDefaultLocation] = useState("CA-PE-PR");

  function changeDefaultLocation(event) {
    event.preventDefault();
    setDefaultLocation(event.target.elements.defaultLocation.value.toUpperCase());
  }

  return(
    <div>
    <h3>Welcome to my bird app!</h3>
    <LocationContext.Provider value={{ defaultLocation: defaultLocation, setDefaultLocation: setDefaultLocation}}>
 
    <div>
      <details>
        <summary style={{fontSize: "0.75em", fontStyle: "italic", paddingBottom: "0.25em"}}>Set a default location</summary>
    <div className="all-details">
    <details>
      <summary>Type in a new default location code</summary>
    <form style={{paddingBottom:"2em"}} onSubmit={changeDefaultLocation}>
        <input
          name="defaultLocation"
          type="text"
          placeholder="eBird region ID eg. CA-PE-PR"
        
        />
        <button>Set a default Location</button>
      </form>
     </details>
      <details>
        <summary>Find an area's eBird location code</summary>
        <div>
          <Regions />
        </div>
      </details>
      <details>
          <summary style={{fontStyle: "italic"}}>What is an eBird region?</summary>
          <div>
          <p>
        You can explore eBird data for an entire country, or for a smaller region like a state or province... sometimes, for a specific county or city.
      </p>
      <p>
        For example, you can search bird data in all of Canada (CA), in the entire province of Ontario (CA-ON), or just in the city of Toronto (CA-ON-TO). 
       </p> 
        <p>The United States, Canada, and Great Britain (GB) are examples of areas where bird data is recorded by top level location, region and sub-region. Many countries, however, do not break down their regions into sub-regions. For example, Sweden's top-level country location code is SE, and Stockholm's location code is SE-AB, and there are no smaller sub-regions classified by eBird.
      </p>

          </div>
        </details>
    </div>
    </details>
    </div>
    <Notable defaultLocation={defaultLocation}/>
    <h2>Other Tools</h2>
      <Recent defaultLocation={defaultLocation}/>
      <RegionDate defaultLocation={defaultLocation}/>
    </LocationContext.Provider>

  </div>
  )
};

export default App