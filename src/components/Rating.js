import React, { useState } from 'react';

const Rating = (props) => {
  const [getScore, setScore] = useState(props.score)
  const [voteUp, setVoteUp] = useState(false)
  const [voteDown, setVoteDown] = useState(false)

  const handleVote = (e) => {
    //fazer a validação do voteUP ou voteDow e converte-los para true / false (habilitar / desabilitar)
  }

  return (
    <div>
      <button onClick={()=> setScore(getScore - 1)}>-</button>
      Score: {getScore}
      <button onClick={()=>setScore(getScore + 1)}>+</button>
    </div>
  )
}

export default Rating;