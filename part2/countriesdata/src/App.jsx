import { useEffect, useState } from 'react'
import countryService from "./services/countries";
import FilteredCountries from './components/filteredCountriesComponent';
import OnlyCountry from './components/singleCountryComponent';

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [message, setMessage] = useState(null);
  const [oneCountry, setOneCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      });
  }, [])

  const handleCountryFilter = (e) => {
    setCountryFilter(e.target.value);
    const countryFilterAux = e.target.value.toLowerCase();
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(countryFilterAux));
    
    if (filtered.length > 10) {
      console.log("Mas de 10", filtered);
      setMessage("Too many matches, specify another filter");
      setFilteredCountries([]);
      setOneCountry(null);
    } else if (filtered.length <= 10 && filtered.length > 1){
      console.log("Menos de 10", filtered);
      setMessage(null);
      setFilteredCountries(filtered);
      setOneCountry(null);
    } else if (filtered.length === 1){
      console.log("Uno", filtered);
      setMessage(null);
      setFilteredCountries([]);
      countryService
        .getOne(filtered[0].name.common)
        .then(onlyCountry => {
          setOneCountry(onlyCountry)
        });

      countryService
        .getWeather(filtered[0].latlng[0], filtered[0].latlng[1])
        .then(countryWeather => {
          setWeather(countryWeather)
        })
    }
  }

  const handleCountryInfo = (country) => {
    setMessage(null);
    setFilteredCountries([]);
    setOneCountry(country);
  }

  return (
    <>
      Find countries <input type='text' value={countryFilter} onChange={handleCountryFilter}/>
      <br/>
      {message}
      <FilteredCountries filteredCountries={filteredCountries} handleCountryInfo={handleCountryInfo} />
      {oneCountry !== null ? <OnlyCountry oneCountry={oneCountry} weather={weather}/> : null}
    </>
  )
}

export default App
