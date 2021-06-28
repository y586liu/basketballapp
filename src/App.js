import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TeamsForm from "./component/TeamsForm";

function App() {
  const [countries, setCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [allleagues, setAlleagues] = useState([]);

  const [selectedLeague, setSelectedLeague] = useState({});

  //get all the leagues of a country
  function onCountryChange(event, value) {
    setLeagues(allleagues.filter((l) => l.country.id === value.id));
  }

  function onLeagueChange(event, value) {
    setSelectedLeague(value);
  }

  function renderTable() {
    if (selectedLeague && Object.keys(selectedLeague).length !== 0) {
      if (selectedLeague.seasons.length === 0) {
        return <h2>There are 0 seasons of this league</h2>;
      } else {
        return <TeamsForm league={selectedLeague} />;
      }
    } else {
      return <h2>Select a league in the left panel to start.</h2>;
    }
  }

  //fetch data of all countries
  useEffect(() => {
    let url = "https://api-basketball.p.rapidapi.com/countries";
    fetchData(url, "country");
  }, []);

  //fetch data of all leagues
  useEffect(() => {
    let url = "https://api-basketball.p.rapidapi.com/leagues";
    fetchData(url, "allleagues");
  }, []);

  function fetchData(url, type) {
    (async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "159c41a39fmsh809ec9a39138a2bp12d233jsne6898ee04471",
          "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        },
      });
      const res = await response.json();
      if (type === "country") {
        setCountries(res.response);
      } else if (type === "allleagues") {
        setAlleagues(res.response);
      } else if (type === "leagues") {
        setLeagues(res.response);
      }
    })();
  }

  return (
    <div id="app">
      <div id="mySidebar" className="sidebar">
        <h2>Select country, then league</h2>
        <li>
          Country
          <br />
        </li>
        <Autocomplete
          id="countrySelect"
          options={countries}
          getOptionLabel={(option) => option.name}
          style={{ width: 200, padding: 30 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a country"
              variant="outlined"
            />
          )}
          onChange={onCountryChange}
        />
        <li>
          League
          <br />
        </li>
        <Autocomplete
          id="leagueSelect"
          options={leagues}
          getOptionLabel={(option) => option.name}
          style={{ width: 200, padding: 30 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a league" variant="outlined" />
          )}
          onChange={onLeagueChange}
        />
        <h2>Or select league directly</h2>
        <li>Search in all leagues</li>
        <Autocomplete
          id="leagueSelect"
          options={allleagues}
          getOptionLabel={(option) => option.name + " - " + option.country.name}
          style={{ width: 200, padding: 30 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a league" variant="outlined" />
          )}
          onChange={onLeagueChange}
        />
      </div>
      {renderTable()}
    </div>
  );
}

export default App;