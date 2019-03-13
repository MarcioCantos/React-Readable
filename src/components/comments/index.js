import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteComment, rateComment } from '../../actions/comments';
import Rating from '../shared/Rating';

const Comment = ({comment, setRate, onDeleteClick}) => {
    const {id, author, body, voteScore} = comment;
    return (
        <Fragment>
                <div>
                    <p>
                        {author}
                    </p>
                    <p>
                        {body}
                    </p>
                    <p>
                    </p>
                    <Rating values={{
                        id,
                        vote : voteScore,
                        setRate : setRate,
                    }} />
                    <button onClick={() => onDeleteClick(id)}>Delete</button>
                </div>

        </Fragment>
    );
};

const mapStateToProps = ({comments}, {id}) => {
    return {
        comment: comments.comments[id],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: bindActionCreators(deleteComment, dispatch),
        setRate: bindActionCreators(rateComment, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);