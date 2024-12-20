import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer';

const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(createAnecdote(anecdote));
        dispatch(showNotification("Anecdote added successfully", 3))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default NewAnecdote;