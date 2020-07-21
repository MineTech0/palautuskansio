import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  const average = () => {

    return ((bad * (-1) + good * 1) / (bad + neutral + good))
  }
  const positive = () => {
    return `${(good) / (good + bad + neutral) * 100} %`
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + bad + neutral} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positive()} />
        </tbody>
      </table>

    </div>
  )
}
const Button = (props) => {

  return (
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='good' click={() => setGood(good + 1)} />
      <Button text='neutral' click={() => setNeutral(neutral + 1)} />
      <Button text='bad' click={() => setBad(bad + 1)} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)