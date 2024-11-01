const Persons = ({ persons, filteredPersons, handleDeletePerson }) => {
    return (
        <>
            {
                filteredPersons.length > 0 ? (
                    filteredPersons.map(person => (
                    <div key={person.name}>
                        {person.name}: {person.number} <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
                    </div>
                    ))
                ) : (
                    persons.map(person => (
                    <div key={person.name}>
                        {person.name}: {person.number} <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
                    </div>
                    ))
                )
            }
        </>
    )
}

export default Persons