const FilteredCountries = ({ filteredCountries, handleCountryInfo }) => {
    return (
        <div>
            <ul>
                {filteredCountries.map((country, index) => (
                    <li key={index}>{country.name.common} <button onClick={() => handleCountryInfo(country)}>show</button></li>
                ))}
            </ul>
        </div>
    )
}

export default FilteredCountries