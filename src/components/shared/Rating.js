import React, { useState } from 'react';
import { connect } from 'react-redux';

const Rating = ({values}) => {
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);
  const {id, vote, setRate} = values;

  const handleVoteDown = (rate) => {
    setVoteDown(rate)
    rate ? submitRatePost('downVote') : submitRatePost('upVote');
    voteUp && submitRatePost('downVote');
    setVoteUp(false)
  }

  const handleVoteUp = (rate) => {
    setVoteUp(rate);
    rate ? submitRatePost('upVote') : submitRatePost('downVote');
    voteDown && submitRatePost('upVote');
    setVoteDown(false);
  }

  const submitRatePost = (rate) => {
    setRate(id, rate)
  }

  const showScore = () => {
    return (
      <div>
        {voteUp && vote }
        {voteDown && vote }
        {voteUp || voteDown ? "" : vote }
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => handleVoteDown(!voteDown)}>-</button>
        {showScore()}
      <button onClick={() => handleVoteUp(!voteUp)}>+</button>
    </div>
  )
}

export default Rating;