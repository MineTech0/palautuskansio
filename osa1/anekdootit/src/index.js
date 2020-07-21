import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Btn = (props) => {
  return (
    <button onClick={props.Click}>
      {props.text}
    </button>
  )
}
const Anecdote = (props) => {
  return (
    <>
    <h1>{props.heading}</h1>
    <p>
      {props.text}
    </p>
    <p>has {props.votes} votes</p>
  </>
  )
}
  const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [Votes, setVote] = useState(new Array(props.anecdotes.length).fill(0));

  const vote = ()=>{
    const copy = [...Votes]; 
    copy[selected] +=1;
    setVote(copy);
      
  }
  const next = ()=>{
    setSelected(Math.floor(Math.random() * props.anecdotes.length));   
  }
  const most =() => Votes.indexOf(Math.max.apply(null, Votes)); 
  

  return (
    <div>
      <Anecdote heading='Anecdote of the day' 
      text={props.anecdotes[selected]}
      votes={Votes[selected]}/>
      <Btn text='Next'Click={()=>next()}/>
      <Btn text='Vote' Click={()=>vote()}/>
      
      <Anecdote heading='Anecdote with most votes' 
      text={props.anecdotes[most()]}
      votes={Votes[most()]}/>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)