import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({name}) => {
  return (
    <div>{name}</div>
  )
}

const CountryInfo = ({name, capital, area, languages, flag}) => {
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
    </div>
  )
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
      <CountryInfo key={country.cca2} name={country.name.common} capital={country.capital} 
      area={country.area} languages={country.languages} flag={country.flags["svg"]} />
    )
  }
  return (
    <div>
      {foundCountries.map(country =>
        <Country key={country.cca2} name={country.name.common} />
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