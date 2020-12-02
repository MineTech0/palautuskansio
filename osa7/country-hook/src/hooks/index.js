import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((res) => {
          setCountry(res.data[0])
        },(error)=>{
            setCountry('not found')
        })
      }, [name])
  
    return country
  }