import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Data = ({ Country }) => {

    const [Weather, setWeather] = useState({})
    const [Loaded, setLoaded] = useState(false)
    const [Error, setError] = useState('')
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${Country.capital}&units=m`)
            .then(response => {
                setWeather(response.data)
                setLoaded(true)
                console.log(Weather)
            })
            .catch(function (error) {
                setError(error);
              })
    },[])
    if (!Loaded){
        return <p>{Error}</p>
    }
    return (
        <>
            <h1>{Country.name}</h1>
            <p>Capital {Country.capital}</p>
            <p>Population {Country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={Country.flag} alt="flag" width='200px' border='1px black' />
            <h2>Weather in {Country.capital}</h2>
            <p><b>Temperature: </b>{Weather.current.temperature} Celsius</p>
            <img src={Weather.current.weather_icons} alt="weather icon" width='200px' border='1px black' />
            <p><b>Wind: </b>{Weather.current.wind_speed} m/s</p>
        </>
    )
}

export default Data
