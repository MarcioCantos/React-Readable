import React, { useState } from 'react';

const Rating = (props) => {
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);
  const getScore = props.score;
  
  const handleVoteUp = () => {
    setVoteUp(!voteUp);
    setVoteDown(false);
  }

  const handleVoteDown = () => {
    setVoteDown(!voteDown)
    setVoteUp(false)
  }

  return (
    <div>
      <button type="submit" onClick={handleVoteDown}>-</button>
      {voteUp && getScore + 1}
      {voteDown && getScore - 1}
      {voteUp || voteDown ? "" : getScore }
      <button onClick={handleVoteUp}>+</button>
    </div>
  )
}

export default Rating;