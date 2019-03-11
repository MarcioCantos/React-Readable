import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ratePost } from '../actions/posts'

const Rating = ({score, id, ratePost}) => {
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);
  
  const handleVoteUp = () => {
    setVoteUp(!voteUp);
    setVoteDown(false);
  }

  const handleVoteDown = () => {
    setVoteDown(!voteDown)
    setVoteUp(false)
  }

  const submitRatePost = (rate) => {
    ratePost(id, rate)
  }

  return (
    <div>
      <button type="submit" onClick={handleVoteDown}>-</button>
      {voteUp && score + 1}
      {voteDown && score - 1}
      {voteUp || voteDown ? "" : score }
      <button onClick={handleVoteUp}>+</button>
    </div>
  )
}


export default connect(null, {ratePost})(Rating);