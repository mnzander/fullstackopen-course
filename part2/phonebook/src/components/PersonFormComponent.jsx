const PersonForm = ({ addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>name: <input type="text" value={newName} onChange={handleNameChange}/></div>
                <br/>
            <div>number: <input type="text" value={newNumber} onChange={handleNumberChange}/></div>
                <br/>
            <div><button type="submit">add</button></div>
      </form>
    )
}

export default PersonForm