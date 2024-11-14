import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <br/><hr/>
      <Anecdotes />
      <br/><hr/>
      <NewAnecdote />
      <br/><hr/>
      <Notification />
    </div>
  )
}

export default App