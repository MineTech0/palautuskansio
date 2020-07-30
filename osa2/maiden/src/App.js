import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Data from './components/Data'
import Item from './components/Item'

function App() {

  const [Countries, setCountries] = useState([])
  const [Country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShow = (e) => {
    setCountry(e.target.value);
  }
  const handleInput = (e) => {
    setCountry(e.target.value);
  }
  const renderCountries = () => {
    let list = Countries.filter(x => x.name.toLowerCase().includes(Country.toLowerCase()))
    if (list.length > 10) {
      return (<p>Too many matches, specify filter</p>)
    } 
    else if(list.length === 1) {
      return <Data Country={list[0]}/>
    }
    else {
      return (list.map(Country => <Item key={Country.name} country={Country} handle={handleShow}/>))
    }
  }
  

  return (
    <div>
      <label>Find countries </label>
      <input value={Country} onChange={handleInput}></input>
      <div>
        {renderCountries()}
      </div>

    </div>
  )
}

export default App;
