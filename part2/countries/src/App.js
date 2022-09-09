import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [detailed, setDetailed] = useState(false)

  const handleClick = () => {
    setDetailed(!detailed)
  }

  return (
    <div>
      {country.name.common}<button onClick={handleClick}>{detailed ? "hide" : "show"} </button>
      {detailed ? <CountryInfo key={country.cca2} country={country} /> : ""}
    </div>
  )
}

const CountryInfo = ({country}) => {
  const name=country.name.common
  const capital=country.capital
  const area=country.area
  const languages=country.languages
  const flag=country.flags["svg"]
  return (
    <div>
      <h1>{name}</h1>
      <p>
        capital {capital} <br></br>
        area {area}
      </p>
      <b>languages:</b>
      <ul>
        {Object.keys(languages).map(id => 
          <li key={id}>{languages[id]}</li>
        )}
      </ul>
      <img src={flag} width='20%' alt={name} />
      <Weather capital={capital} />
    </div>
  )
}

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  // Will fail without because at first weatherData.main is undefined and doesn't have 'temp'
  if (weatherData.length !== 0) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {(weatherData.main.temp)} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
}

const CountriesList = ({foundCountries}) => {
  if (foundCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (foundCountries.length === 1) {
    let country = foundCountries[0]
    return (
      <CountryInfo key={country.cca2} country={country} />
    )
  }
  return (
    <div>
      {foundCountries.map(country =>
        <Country key={country.cca2} country={country} />
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [foundCountries, setFoundCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    let searchString = event.target.value.toLowerCase()
    setFoundCountries(countries.filter(country => country.name.common.toLowerCase().includes(searchString)))
  }
  return (
    <div>
      <form>
        <div>
          find countries <input
          onChange={handleSearch} />
        </div>
      </form>
      <CountriesList foundCountries={foundCountries} />
    </div>
  )

}

export default App