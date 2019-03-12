import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ratePost } from '../actions/posts'

const Rating = ({id, vote, ratePost}) => {
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);

  console.log("VOTEE:::", vote)
  
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
    ratePost(id, rate)
  }

  return (
    <div>
      <button onClick={() => handleVoteDown(!voteDown)}>-</button>
      {voteUp && vote }
      {voteDown && vote }
      {voteUp || voteDown ? "" : vote }
      <button onClick={() => handleVoteUp(!voteUp)}>+</button>
    </div>
  )
}

const mapStateToProps = (store, {id}) => {
  return {vote : store.posts.posts[id].voteScore}
}

export default connect(mapStateToProps, {ratePost})(Rating);