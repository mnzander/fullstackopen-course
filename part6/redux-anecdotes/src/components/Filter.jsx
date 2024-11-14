import { setFilter } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (event) =>{
    const filterValue = event.target.value;
    console.log(filterValue)
    if (!filterValue || filterValue.length < 1) {
        dispatch(setFilter(""));
    } else{
        dispatch(setFilter(filterValue))
    }
  }

  return (
    <div>
        filter <input type='text' name="filter" onChange={handleFilter}/>
    </div>
  )
};

export default Filter

