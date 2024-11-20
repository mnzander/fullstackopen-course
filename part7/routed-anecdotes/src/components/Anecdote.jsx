import { Link, useParams } from "react-router-dom";

const Anecdote = ({ anecdote }) => {
    const id = useParams().id;

    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>has {anecdote.votes} votes</div>
            <br/>
            <div>for more info see https://martinfowler.com/bliki/FrequencyReducesDifficulty.html</div>
            <br/>
        </div>
    )
}
    


export default Anecdote;