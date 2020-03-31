import React, { useState, useEffect } from 'react'

import countriesService from './services/countries'

const FindCountries = ({ input, onChange }) => {
  return (
    <div>
      find countries<input value={input} onChange={onChange} />
    </div>
  )
}

const Country = ({ country, action }) =>
  <div name={country.name}>{country.name} <button onClick={action}>Hello world</button></div>

const CountryDetail = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="100" />
    </>
  )
}


const Countries = ({ countries, action }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return (countries.length > 10)
    ? "Too many matches, specify another filter"
    : countries.map((country, i) => <Country key={i} country={country} action={action} />
    )
}

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
    const hook = async () => {
      const countries = await countriesService.getAll();
      setCountries(countries)
    }
    hook()
  }, [])

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleDetail = (e) => {
    // dirty hack
    const name = e.target.parentNode.getAttribute('name');
    setInput(name);
  }

  const filteredCountries = (input === "")
    ? []
    : countries
      .filter(country => country.name.toLowerCase().includes(input.toLowerCase()))

  return (
    <>
      <FindCountries input={input} onChange={handleInput} />
      <Countries countries={filteredCountries} action={handleDetail} />
    </>
  )
}

export default App;
