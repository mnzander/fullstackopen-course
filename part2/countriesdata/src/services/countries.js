import axios from "axios"

const getAll = () => {
    try{
        const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
        return request.then(response => response.data);
    } catch (error) {
        console.log("Failed getting countries");
    }
}

const getOne = (name) => {
    try{
        const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
        return request.then(response => response.data);
    } catch(error){
        console.log("Failed getting the country");
    }
}

const getWeather = (lat, lon) => {
    try{
        const request = axios.get(`https://my.meteoblue.com/packages/current?apikey=9D4liS37gzaoKLJP&lat=${lat}&lon=${lon}&format=json`);
        return request.then(response => response.data);
    } catch (error) {
        console.log("Could not get the weather");
    }
}

export default { getAll, getOne, getWeather };