import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comments';

const Comment = ({comment, onDeleteClick}) => {
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
                        {voteScore}
                    </p>
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

export default connect(mapStateToProps,{onDeleteClick: deleteComment})(Comment);