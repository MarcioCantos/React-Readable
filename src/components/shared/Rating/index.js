import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = (props) => {
	Rating.propTypes = {
		id: PropTypes.string,
		vote: PropTypes.number,
		setRate: PropTypes.func
	};

	const [ voteUp, setVoteUp ] = useState(false);
	const [ voteDown, setVoteDown ] = useState(false);
	const IconVoteUp = props.iconVoteUp;
	const IconVoteDown = props.iconVoteDown;
	const { id, vote, setRate } = props.values;

	const handleVoteDown = (rate) => {
		setVoteDown(rate);
		rate ? submitRatePost('downVote') : submitRatePost('upVote');
		voteUp && submitRatePost('downVote');
		setVoteUp(false);
	};

	const handleVoteUp = (rate) => {
		setVoteUp(rate);
		rate ? submitRatePost('upVote') : submitRatePost('downVote');
		voteDown && submitRatePost('upVote');
		setVoteDown(false);
	};

	const submitRatePost = (rate) => {
		setRate(id, rate);
	};

	const showScore = () => {
		return (
			<div className={`score ${voteUp ? 'voteUp' : ''}${voteDown ? 'voteDown' : ''}`}>
				{voteUp && vote}
				{voteDown && vote}
				{voteUp || voteDown ? '' : vote}
			</div>
		);
	};

	return (
		<div>
			<IconVoteUp className={`${voteUp ? 'voteUp' : ''} btn-vote`} onClick={() => handleVoteUp(!voteUp)} />
			{showScore()}
			<IconVoteDown
				className={`${voteDown ? 'voteDown' : ''} btn-vote`}
				onClick={() => handleVoteDown(!voteDown)}
			/>
		</div>
	);
};

export default Rating;
