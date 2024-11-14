import { useDispatch, useSelector } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => {
      if (state.filter === "") {
        return state.anecdotes;
      } else {
        return state.anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        );
      }
    });

    const vote = (id) => {
        dispatch(incrementVote(id));
        const anecdote = anecdotes.filter(a => a.id === id);
        dispatch(showNotification(`you voted ${anecdote[0].content}`, 3))
    };

    return (
        <div>
            {anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Anecdotes;
