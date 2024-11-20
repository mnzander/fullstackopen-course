import axios from 'axios'
import { useState, useEffect } from 'react'

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
    const [country, setCountry] = useState(null);
    const baseUrl = 'https://restcountries.com/v3.1/name';

    useEffect(() => {
        const fetchData = async () => {
          if (name) {
            try {
              const response = await axios.get(`${baseUrl}/${name}`);
              setCountry({ found: true, data: response.data[0] });
            } catch (error) {
              setCountry({ found: false, data: '' });
            }
          }
        };
      
        fetchData();
      }, [name]);
   
    return country
}