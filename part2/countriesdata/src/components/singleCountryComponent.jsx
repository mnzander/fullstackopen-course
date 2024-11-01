const OnlyCountry = ({ oneCountry, weather }) => {
    return (
        <>  
            <h1>{oneCountry.name.common}</h1>
            <p>capital: {oneCountry.capital}</p>
            <p>area: {oneCountry.area}</p>

            <b>languages:</b>
            <ul>
            {Object.values(oneCountry.languages).map((language, index) =>
                <li key={index}>{language}</li>
            )}
            </ul>

            <img alt="country flag" src={oneCountry.flags.png}></img>

            <h2>Weather in {oneCountry.capital}</h2>
            <p>temperature: {(Math.round(weather.data_current.temperature * 10) / 10).toFixed(1)}°C</p>
            <p>wind: {weather.windspeed === null ||weather.windspeed === undefined ? "No data available, try later" : `${weather.windspeed} m/s`}</p>
        </>
    )
};

export default OnlyCountry;