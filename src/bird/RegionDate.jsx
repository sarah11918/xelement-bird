import React from "react";
import { useState, useContext } from "react";
import LocationContext from './LocationContext.jsx';

export default function RegionDate() {
  const context = useContext(LocationContext);
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState({});
  const [year, setYear]= useState("2021");
  const [month, setMonth]= useState("12");
  const [day, setDay]= useState("01");


  async function getBirdSightings(event) {
    event.preventDefault();
    setLocation(event.target.elements.location.value.toUpperCase())
    const queryLocation = event.target.elements.location.value.toUpperCase()
    const recentUrl = `https://api.ebird.org/v2/product/stats/${queryLocation}/${year}/${month}/${day}`
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `2ifbkhv7g8ct`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(
      recentUrl,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    setSummary(data);
  }

  async function changeLocationToDefaultLocation() {
    setLocation(context.defaultLocation);
    const queryLocation = context.defaultLocation
    const recentUrl = `https://api.ebird.org/v2/product/stats/${queryLocation}/${year}/${month}/${day}`
    const myHeaders = new Headers();
    myHeaders.append("X-eBirdApiToken", `2ifbkhv7g8ct`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(
      recentUrl,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    setSummary(data);
  }
  

  return (
      <div style={{ backgroundColor: "#eef9ed", padding:"0.5em", border: "1px solid green", borderRadius: "2px"}}>
      <h3>What happened on...
      <select name="monthSelect" id="monthSelect" value={month} onChange={()=>{setMonth(event.target.value)}}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
      </select>
      <select name="daySelect" id="daySelect" value={day} onChange={()=>{setDay(event.target.value)}}>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
      </select>
      <select name="yearSelect" id="yearSelect" value={year} onChange={()=>{setYear(event.target.value)}}>
      <option value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
      <option value="2015">2015</option>
      <option value="2014">2014</option>
      <option value="2013">2013</option>
      <option value="2012">2012</option>
      <option value="2011">2011</option>
      <option value="2010">2010</option>
      <option value="2009">2009</option>
      <option value="2008">2008</option>
      <option value="2007">2007</option>
      <option value="2006">2006</option>
      <option value="2005">2005</option>
      <option value="2004">2004</option>
      <option value="2003">2003</option>
      <option value="2002">2002</option>
      <option value="2001">2001</option>
      <option value="2000">2000</option>
    </select>?</h3>


      <h5 className="birdtab">Showing summary for: {location} / (Default Location: {context.defaultLocation})</h5>
      <p>⚠️ a current bug in the API shows 0 results for location codes with sub-regions! (eg CA-ON<b><em>-TO</em></b>) ⚠️</p>
    
      
      <div style={{textAlign:"center"}}>
        <button
          style = {{backgroundColor: "yellow"}}
            className="location-change quickLocation"
            onClick={changeLocationToDefaultLocation}
          >
            <span style={{fontWeight: "bold"}}>Use my Default Location</span>
          </button>
        <p>or set manually</p>
        <form onSubmit={getBirdSightings}>
          <input
            name="location"
            type="text"
            placeholder="eBird region ID eg. CA-PE"
            style={{ textTransform: "uppercase" }}
          />
          <button> See the summary!</button>
        </form>
        </div>
     
        <h3>Summary for {year}-{month}-{day}</h3>
        <p>Number of Checklists submitted: {summary.numChecklists}</p>
        <p>Number of Checklist contributors: {summary.numContributors}</p>
        <p>Number of Bird Species seen: {summary.numSpecies}</p>
    </div>
  );
}
