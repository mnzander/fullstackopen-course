import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
      <br /><br />
    </div>
  )
};

const Stats = ({ stats }) => {
  const { good, neutral, bad, all, avg, positive } = stats;

  if (all === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine text = "good" value = {good}/>
        <StatisticLine text = "neutral" value = {neutral}/>
        <StatisticLine text = "bad" value = {bad}/>
        <StatisticLine text = "all" value = {all}/>
        <StatisticLine text = "average" value = {avg}/>
        <StatisticLine text = "positive" value = {`${positive}%`}/>
      </tbody>
    </table>
  )
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const goodAux = good + 1;
    setGood(goodAux);
    const allAux = goodAux + neutral + bad
    setAll(allAux);
    setAvg((goodAux - bad) / allAux);
    const positiveAux =  (goodAux * 100) / allAux;
    setPositive(positiveAux);
  }

  const handleNeutralClick = () => {
    const neutralAux = neutral + 1;
    setNeutral(neutralAux);
    const allAux = neutralAux + good + bad;
    setAll(allAux);
    const positiveAux =  (good * 100) / allAux;
    setPositive(positiveAux);
  }

  const handleBadClick = () => {
    const badAux = bad + 1;
    setBad(badAux);
    const allAux = badAux + good + neutral;
    setAll(allAux);
    setAvg((good - badAux) / allAux);
    const positiveAux =  (good * 100) / allAux;
    setPositive(positiveAux);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick = {handleGoodClick} text = "good"/>
      <Button onClick = {handleNeutralClick} text = "neutral"/>
      <Button onClick = {handleBadClick} text = "bad"/>
      <h2>statistics</h2>
      <Stats stats={{ good, neutral, bad, all, avg, positive }} />
    </>
  )
};

export default App